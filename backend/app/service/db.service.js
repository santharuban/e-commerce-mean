const saveData = async (Model) => {
  return Model.save();
};

const findData = async (Model, data) => {
  return Model.find(data);
};

const findSingleData = async (Model, data) => {
  return Model.findOne(data);
};

const findDataById = async (Model, id) => {
  return Model.findById(id);
};

const editData = async (Model, id, data) => {
  return Model.findByIdAndUpdate(id, data);
};

const deleteData = async (Model, id) => {
  return Model.findByIdAndRemove(id);
};

const findPagination=async (Model,id) =>{
  return Model.find().limit(limit).skip(skip);
}
module.exports = {
  saveData,
  findData,
  findSingleData,
  findDataById,
  editData,
  deleteData,
  findPagination,
};

