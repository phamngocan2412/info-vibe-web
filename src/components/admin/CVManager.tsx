import { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaDownload, FaCopy, FaCheck, FaFileUpload, FaSpinner } from 'react-icons/fa';
import { cvList } from '../../data/cv';
import type { CV } from '../../data/cv';
import { supabase } from '../../lib/supabase';

export default function CVManager() {
    const [cvs, setCvs] = useState<CV[]>(cvList);
    const [newCV, setNewCV] = useState({ label: '', fileName: '' });
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    // Load from localStorage first to simulate persistence during session
    useEffect(() => {
        const stored = localStorage.getItem('local_cv_list');
        if (stored) {
            setCvs(JSON.parse(stored));
        }
    }, []);

    const saveToLocal = (newList: CV[]) => {
        setCvs(newList);
        localStorage.setItem('local_cv_list', JSON.stringify(newList));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            // Auto-fill filename if empty
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
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('cvs')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data } = supabase.storage
                .from('cvs')
                .getPublicUrl(filePath);

            // 3. Add to List
            const newItem: CV = {
                id: Date.now().toString(),
                label: newCV.label,
                fileName: file.name,
                url: data.publicUrl,
                isDefault: cvs.length === 0,
                lastUpdated: new Date().toISOString().split('T')[0]
            };

            saveToLocal([...cvs, newItem]);
            setNewCV({ label: '', fileName: '' });
            setFile(null);

            // Reset file input
            const fileInput = document.getElementById('cv-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`Upload failed: ${error.message || 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    const deleteCV = (id: string) => {
        const newList = cvs.filter(c => c.id !== id);
        if (cvs.find(c => c.id === id)?.isDefault && newList.length > 0) {
            newList[0].isDefault = true;
        }
        saveToLocal(newList);
    };

    const makeDefault = (id: string) => {
        const newList = cvs.map(c => ({
            ...c,
            isDefault: c.id === id
        }));
        saveToLocal(newList);
    };

    const generateConfig = () => {
        const config = `export interface CV {
    id: string;
    label: string;
    fileName: string;
    url?: string;
    isDefault: boolean;
    lastUpdated: string;
}

export const cvList: CV[] = ${JSON.stringify(cvs, null, 4)};

export const getActiveCV = (): CV | undefined => {
    return cvList.find(cv => cv.isDefault) || cvList[0];
};`;
        navigator.clipboard.writeText(config);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Hidden CV Manager</h1>
                    <button
                        onClick={generateConfig}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                        {copied ? <FaCheck /> : <FaCopy />}
                        <span>{copied ? 'Copied Config!' : 'Copy Config to Clipboard'}</span>
                    </button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800 text-sm">
                    <strong>Supabase Storage Setup Required:</strong>
                    <p className="mt-1 mb-2">Before uploading, go to your Supabase Dashboard &rarr; Storage and create a bucket named <code>cvs</code>.</p>
                    <details>
                        <summary className="cursor-pointer font-bold text-blue-600 dark:text-blue-400">View SQL Policy (Required for Public Access)</summary>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2 overflow-x-auto text-xs font-mono">
                            {`-- 1. Create bucket (if not exists via UI)
insert into storage.buckets (id, name, public) values ('cvs', 'cvs', true);

-- 2. Allow public access to read files
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'cvs' );

-- 3. Allow authenticated users (anon/service_role) to upload
create policy "Allow Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'cvs' );`}
                        </pre>
                    </details>
                </div>

                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mb-8 border border-yellow-200 dark:border-yellow-700 text-sm">
                    <strong>Workflow:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Upload your PDF below (it goes to Supabase Cloud).</li>
                        <li>Manage your list (Delete old ones, Set Default).</li>
                        <li>Click <strong>"Copy Config"</strong>.</li>
                        <li>Paste into <code>src/data/cv.ts</code> &rarr; Commit &rarr; Push.</li>
                    </ol>
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
                    {cvs.map(cv => (
                        <div key={cv.id} className={`flex items-center justify-between p-5 rounded-xl border ${cv.isDefault ? 'border-primary bg-primary/5' : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cv.isDefault ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                    <FaStar />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        {cv.label}
                                        {cv.isDefault && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Default</span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-mono flex items-center gap-2">
                                        {cv.url ? <span className="text-green-600 text-xs border border-green-200 bg-green-50 px-1 rounded">Cloud Hosted</span> : <span className="text-orange-500 text-xs border border-orange-200 bg-orange-50 px-1 rounded">Local File</span>}
                                        {cv.fileName} • {cv.lastUpdated}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {!cv.isDefault && (
                                    <button
                                        onClick={() => makeDefault(cv.id)}
                                        className="px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                                    >
                                        Set Default
                                    </button>
                                )}
                                <a
                                    href={cv.url || `/cvs/${cv.fileName}`}
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
                    {cvs.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No CVs added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
