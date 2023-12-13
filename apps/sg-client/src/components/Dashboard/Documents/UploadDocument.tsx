import React, { useState, ChangeEvent } from 'react';
import usePhotoUploader from '../../hooks/usePhotoUploader';

const DocumentUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<{ name: string, file: string, type: string } | null>(null);

    const { uploadDocument } = usePhotoUploader();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setSelectedFile({ name: file.name, file: reader.result, type: file.type });
                }
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (selectedFile) {
                console.log('selected file', selectedFile);
                await uploadDocument(selectedFile); // Now includes the file type
            } else {
                alert('No file selected');
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default DocumentUploader;
