import { useState } from 'react';
import api from '../api';

const FilesUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Get UUID from the API
      const response = await fetch("https://www.uuidgenerator.net/api/version7");
      const uuid = await response.text();

      // Get file extension from original file
      const fileExtension = file.name.split('.').pop();

      // Create new file with UUID name
      const renamedFile = new File(
        [file],
        `${uuid.trim()}.${fileExtension}`,
        { type: file.type }
      );

      // Upload renamed file to images bucket
      const uploadResponse = await api.uploadFileToBucket(renamedFile, 'images');
      console.log('File uploaded successfully to images bucket:', uploadResponse);

      // You can store the UUID and original filename mapping here if needed
      const fileData = {
        uuid: uuid,
        originalName: file.name,
        newName: renamedFile.name
      };
      console.log('File data:', fileData);

    } catch (error) {
      console.error('Error uploading file to images bucket:', error);
    } finally {
      setIsUploading(false);
    }
  };


 return (
    <div className="h-auto w-36 fixed bottom-5 translate-x-[870px] z-50">
      <div className="relative shadow-neumorphic border bg-blue-500 border-blue-800 rounded-lg flex justify-center items-center p-3">
        <div className="absolute flex flex-col items-center">
          <span className="block text-white font-eudoxussans">
            {isUploading ? 'Uploading...' : 'Add Files'}
          </span>
        </div>

        <input
          className="h-full w-full opacity-0 cursor-pointer"
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default FilesUpload;
