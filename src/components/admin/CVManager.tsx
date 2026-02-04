import { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaDownload, FaFileUpload, FaSpinner, FaEye, FaTimes } from 'react-icons/fa';
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // For PDF Preview
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // UI Error State

    // Fetch Real Data from Database
    const fetchCVs = async () => {
        // Optimistic: Don't set global loading if we already have data
        if (cvs.length === 0) setLoading(true);

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
        setErrorMsg(null);
        if (!newCV.label || !file) {
            setErrorMsg("Please provide a label and select a file.");
            return;
        }

        // Validate File
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_SIZE) {
            setErrorMsg("File size must be less than 5MB.");
            return;
        }
        if (file.type !== 'application/pdf') {
            setErrorMsg("Only PDF files are allowed.");
            return;
        }

        setUploading(true);
        try {
            // Optimistic UI Update placeholder
            const tempId = `temp-${Date.now()}`;
            const optimisticCV: CVEntry = {
                id: tempId,
                label: newCV.label,
                file_name: file.name,
                url: '', // Temporary
                is_default: cvs.length === 0,
                created_at: new Date().toISOString()
            };
            setCvs(prev => [optimisticCV, ...prev]);

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
            const { data: insertedData, error: dbError } = await supabase
                .from('cv_entries')
                .insert([{
                    label: newCV.label,
                    file_name: file.name,
                    url: publicUrlData.publicUrl,
                    is_default: cvs.length === 0
                }])
                .select() // Select to get the real ID
                .single();

            if (dbError) throw dbError;

            // Replace optimistic with real data
            setCvs(prev => prev.map(cv => cv.id === tempId ? insertedData : cv));

            setNewCV({ label: '', fileName: '' });
            setFile(null);

            const fileInput = document.getElementById('cv-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error('Error:', error);
            setErrorMsg(error.message || 'Upload failed. Please try again.');
            // Revert optimistic update on failure
            setCvs(prev => prev.filter(cv => !cv.id.startsWith('temp-')));
        } finally {
            setUploading(false);
        }
    };

    const deleteCV = async (id: string) => {
        if (!confirm("Are you sure? This will delete the record.")) return;
        setErrorMsg(null);

        // Optimistic Delete
        const previousCvs = [...cvs];
        setCvs(prev => prev.filter(c => c.id !== id));

        try {
            const { error } = await supabase
                .from('cv_entries')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error: any) {
            setErrorMsg(`Delete failed: ${error.message}`);
            setCvs(previousCvs); // Revert
        }
    };

    const makeDefault = async (id: string) => {
        setErrorMsg(null);
        // Optimistic Update
        const previousCvs = JSON.parse(JSON.stringify(cvs));
        setCvs(prev => prev.map(c => ({
            ...c,
            is_default: c.id === id
        })));

        try {
            await supabase.from('cv_entries').update({ is_default: false }).neq('id', '00000000-0000-0000-0000-000000000000');
            const { error } = await supabase
                .from('cv_entries')
                .update({ is_default: true })
                .eq('id', id);

            if (error) throw error;
        } catch (error: any) {
            setErrorMsg(`Update failed: ${error.message}`);
            setCvs(previousCvs); // Revert
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Live CV Manager (Database)</h1>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg mb-8 border border-green-200 dark:border-green-700 text-sm">
                    <strong>Real-time System Active:</strong>
                    <p className="mt-1">Changes made here update the Home page immediately. No build/deploy required.</p>
                </div>

                {errorMsg && (
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-8 border border-red-200 dark:border-red-700 text-sm text-red-700 dark:text-red-200 flex justify-between items-center animate-pulse">
                        <span>{errorMsg}</span>
                        <button onClick={() => setErrorMsg(null)}><FaTimes /></button>
                    </div>
                )}

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
                        <div className="col-span-2 flex flex-col min-w-0">
                            <label className="block text-sm font-medium mb-1">PDF File</label>
                            <div className="flex gap-2 items-center min-w-0">
                                <div className="flex-1 min-w-0 relative">
                                    <label
                                        htmlFor="cv-file-input"
                                        className="flex items-center gap-2 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-0"
                                    >
                                        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold shrink-0">
                                            Browse...
                                        </div>
                                        <span className={`flex-1 truncate text-sm ${file ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400'}`} title={file?.name || "Choose PDF file"}>
                                            {file ? file.name : "Choose PDF file..."}
                                        </span>
                                    </label>
                                    <input
                                        id="cv-file-input"
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button
                                    onClick={uploadAndAddCV}
                                    disabled={uploading}
                                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-w-[120px]"
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
                        <div className="flex justify-center py-10">
                            <FaSpinner className="animate-spin text-4xl text-primary" />
                        </div>
                    ) : cvs.map(cv => (
                        <div key={cv.id} className={`flex items-center justify-between p-5 rounded-xl border ${cv.is_default ? 'border-primary bg-primary/5' : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'} min-w-0 gap-4`}>
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cv.is_default ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                    <FaStar />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-lg flex items-center gap-2 truncate" title={cv.label}>
                                        <span className="truncate">{cv.label}</span>
                                        {cv.is_default && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full shrink-0">Default</span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-mono flex items-center gap-2 truncate" title={cv.file_name}>
                                        {cv.url ? <span className="text-green-600 text-xs border border-green-200 bg-green-50 px-1 rounded shrink-0">Cloud Hosted</span> : <span className="text-orange-500 text-xs border border-orange-200 bg-orange-50 px-1 rounded shrink-0">Local File</span>}
                                        <span className="truncate">{cv.file_name}</span> • {new Date(cv.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                {!cv.is_default && (
                                    <button
                                        onClick={() => makeDefault(cv.id)}
                                        className="px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    onClick={() => setPreviewUrl(cv.url)}
                                    className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                                    title="Preview"
                                >
                                    <FaEye />
                                </button>
                                <a
                                    href={cv.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                                    title="Download"
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

            {/* PDF Preview Modal */}
            {previewUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-dark-card w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-zoom-in">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-border">
                            <h3 className="font-bold text-lg">PDF Preview</h3>
                            <button
                                onClick={() => setPreviewUrl(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
                            <iframe
                                src={`${previewUrl}#toolbar=0`}
                                className="w-full h-full"
                                title="CV Preview"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}