import { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaDownload, FaFileUpload, FaSpinner } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

interface CVEntry {
    id: string;
    label: string;
    file_name: string;
    url: string;
    is_default: boolean;
    created_at: string;
}

export default function CVManager() {
    const [cvs, setCvs] = useState<CVEntry[]>([]);
    const [newCV, setNewCV] = useState({ label: '', fileName: '' });
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Real Data from Database
    const fetchCVs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('cv_entries')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setCvs(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCVs();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            if (!newCV.fileName) {
                setNewCV(prev => ({ ...prev, fileName: e.target.files![0].name }));
            }
        }
    };

    const uploadAndAddCV = async () => {
        if (!newCV.label || !file) {
            alert("Please provide a label and select a file.");
            return;
        }

        setUploading(true);
        try {
            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('cvs')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('cvs')
                .getPublicUrl(fileName);

            // 2. Insert into Database
            const { error: dbError } = await supabase
                .from('cv_entries')
                .insert([{
                    label: newCV.label,
                    file_name: file.name,
                    url: publicUrlData.publicUrl,
                    is_default: cvs.length === 0 // Make default if it's the first one
                }]);

            if (dbError) throw dbError;

            // Refresh list
            await fetchCVs();
            setNewCV({ label: '', fileName: '' });
            setFile(null);

            const fileInput = document.getElementById('cv-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const deleteCV = async (id: string) => {
        if (!confirm("Are you sure? This will delete the record.")) return;

        try {
            // Extract filename from URL to delete from storage (optional but clean)
            // For now, just deleting the DB record is enough to hide it
            const { error } = await supabase
                .from('cv_entries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchCVs();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const makeDefault = async (id: string) => {
        try {
            // 1. Set all to false
            await supabase.from('cv_entries').update({ is_default: false }).neq('id', '00000000-0000-0000-0000-000000000000');

            // 2. Set target to true
            const { error } = await supabase
                .from('cv_entries')
                .update({ is_default: true })
                .eq('id', id);

            if (error) throw error;
            await fetchCVs();
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Live CV Manager (Database)</h1>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg mb-8 border border-green-200 dark:border-green-700 text-sm">
                    <strong>Real-time System Active:</strong>
                    <p className="mt-1">Changes made here update the Home page immediately. No build/deploy required.</p>
                </div>

                {/* Add New */}
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl border border-light-border dark:border-dark-border mb-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Upload New CV</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                             <label className="block text-sm font-medium mb-1">Label</label>
                             <input
                                type="text"
                                placeholder="e.g. Senior Go Dev"
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                                value={newCV.label}
                                onChange={e => setNewCV({ ...newCV, label: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <label className="block text-sm font-medium mb-1">PDF File</label>
                            <div className="flex gap-2">
                                <input
                                    id="cv-file-input"
                                    type="file"
                                    accept=".pdf"
                                    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    onChange={handleFileChange}
                                />
                                <button
                                    onClick={uploadAndAddCV}
                                    disabled={uploading}
                                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                                >
                                    {uploading ? <FaSpinner className="animate-spin" /> : <><FaFileUpload /> Upload</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-center py-8 opacity-50">Loading database...</p>
                    ) : cvs.map(cv => (
                        <div key={cv.id} className={`flex items-center justify-between p-5 rounded-xl border ${cv.is_default ? 'border-primary bg-primary/5' : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cv.is_default ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                    <FaStar />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        {cv.label}
                                        {cv.is_default && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Default</span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-mono flex items-center gap-2">
                                        <span className="text-green-600 text-xs border border-green-200 bg-green-50 px-1 rounded">DB Configured</span>
                                        {cv.file_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {!cv.is_default && (
                                    <button
                                        onClick={() => makeDefault(cv.id)}
                                        className="px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Set Default
                                    </button>
                                )}
                                <a
                                    href={cv.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                                    title="Preview"
                                >
                                    <FaDownload />
                                </a>
                                <button
                                    onClick={() => deleteCV(cv.id)}
                                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                    {!loading && cvs.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No CVs found in database.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
