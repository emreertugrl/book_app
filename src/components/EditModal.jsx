import { useState } from "react";

const EditModal = ({
  setShowEditModal,
  editItem,
  setEditItem,
  handleEditBook,
}) => {
  const [newBookName, setNewBookName] = useState("");
  //   kaydet butonuna tıklanınca çalışır.
  const handleSave = () => {
    // modalı kapatır
    setShowEditModal(false);
  };
  console.log(newBookName);
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Kitap İsmini Düzenle</h5>

        <input
          value={editItem.title}
          type="text"
          name=""
          id=""
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-warning shadow"
            onClick={() => setShowEditModal(false)}
          >
            Vazgeç
          </button>
          <button className="btn btn-success shadow" onClick={handleEditBook}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
