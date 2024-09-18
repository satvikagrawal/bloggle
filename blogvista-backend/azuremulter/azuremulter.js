const dotenv = require("dotenv");

const multer = require("multer");
const { MulterAzureStorage } = require("multer-azure-blob-storage");

const allowedFiles = ["image/jpeg", "image/jpg", "image/png"];

dotenv.config();
const upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString:
      process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING,
    azureStorageAccessKey: process.env.ACCESS_KEY,
    azureStorageAccount: process.env.STORAGE_ACCOUNT_NAME,
    containerName: process.env.CONTAINER_NAME,
    containerSecurity: "blob",
    accessKey: process.env.ACCESS_KEY,
    accountName: process.env.STORAGE_ACCOUNT_NAME,
  }),
  fileFilter: (req, file, cb) => {
    if (allowedFiles.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type"));
    }
  },
});
module.exports = upload;
