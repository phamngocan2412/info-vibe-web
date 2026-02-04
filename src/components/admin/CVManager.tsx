import { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaDownload, FaPlus, FaCopy, FaCheck } from 'react-icons/fa';
import { cvList } from '../../data/cv';
import type { CV } from '../../data/cv';

export default function CVManager() {
    const [cvs, setCvs] = useState<CV[]>(cvList);
    const [newCV, setNewCV] = useState({ label: '', fileName: '' });
    const [copied, setCopied] = useState(false);

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

    const addCV = () => {
        if (!newCV.label || !newCV.fileName) return;
        const newItem: CV = {
            id: Date.now().toString(),
            label: newCV.label,
            fileName: newCV.fileName,
            isDefault: cvs.length === 0,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        saveToLocal([...cvs, newItem]);
        setNewCV({ label: '', fileName: '' });
    };

    const deleteCV = (id: string) => {
        const newList = cvs.filter(c => c.id !== id);
        // If we deleted the default, make the first one default
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

                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mb-8 border border-yellow-200 dark:border-yellow-700 text-sm">
                    <strong>Note:</strong> Since this is a static site without a database:
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Manage your CVs here.</li>
                        <li>Click <strong>"Copy Config"</strong>.</li>
                        <li>Paste the content into <code>src/data/cv.ts</code> in your codebase.</li>
                        <li>Commit and push to update the live site.</li>
                        <li>Ensure PDF files exist in the <code>public/cvs/</code> folder.</li>
                    </ol>
                </div>

                {/* Add New */}
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl border border-light-border dark:border-dark-border mb-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Add New CV Link</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Label (e.g. Backend Go Developer)"
                            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                            value={newCV.label}
                            onChange={e => setNewCV({ ...newCV, label: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="File Name in public/cvs/ (e.g. cv-go.pdf)"
                            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                            value={newCV.fileName}
                            onChange={e => setNewCV({ ...newCV, fileName: e.target.value })}
                        />
                        <button
                            onClick={addCV}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaPlus /> Add
                        </button>
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
                                    <p className="text-sm text-gray-500 font-mono">{cv.fileName} • {cv.lastUpdated}</p>
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
                                    href={`/cvs/${cv.fileName}`}
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
