import * as del from 'del';

const fileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(zip|xml|dmg)$/)) {
    return cb(new Error('Only zip, xml, dmg files are allowed!'), false);
  }

  cb(null, true);
};

const loadCollection = () => {
  console.log('Not yet supported!');
};

const cleanFolder = (folderPath) => {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export { fileFilter, loadCollection, cleanFolder };