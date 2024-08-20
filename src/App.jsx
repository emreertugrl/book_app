import { useState } from "react";
import BookCard from "./components/BookCard"; // Yalnızca import
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

BookCard;

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ekle butonuna tıklandığı anda çalışır
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      // bildirim verme
      toast.warn("Lütfen Kitap ismi giriniz.", { autoClose: 2000 });
      return;
    }

    //kitap için  gerekli bilgilere sahip obje oluşturma
    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    //oluşan newBook itemlerini books dizisine aktar
    //spread
    setBooks([...books, newBook]);

    // eleman eklenince imputu sıfırlama
    setBookName("");
    //bildirim ver
    toast.success("Kitap Eklenndi.", { autoClose: 2000 });
  };

  // modalı aç kapa
  const handleModal = (id) => {
    //id'yi state aktarma
    setDeleteId(id);
    // modali açma
    setShowConfirm(true);
  };
  //ekrandan obje silme
  const handleDelete = (deletingId) => {
    //silinecek idye eşit olmayan objeleri al ve bir diziye aktar.
    const filtered = books.filter((item) => item.id !== deletingId);
    //oluşan iziyi state aktar
    setBooks(filtered);
    //bildirim ver
    toast.error("Kitap Silindi", { autoClose: 2000 });
  };

  //okundu butonuna basınca çalışır.
  //splice istekleri
  //1-okundu değerini tersine çevir
  //2-books dizisinin kopyasını oluştur
  //3-düzenlenicek olan kitabın dizideki sırasını bul >find index
  //4-eski kitabı diziden çıkar yerine güncellenmişi koy >splice
  //5- güncel olan kopya diziyi state aktar
  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };
    // dizinin kopyasını oluşturma
    const cloneBooks = [...books]; // spread operatörü ile kopyalama
    // dizinin indeksini bulma
    const index = cloneBooks.findIndex((item) => item.id === book.id);

    cloneBooks.splice(index, 1, updatedBook);

    setBooks(cloneBooks);
  };

  // kitabı günceller
  const handleEditBook = () => {
    console.log(editItem);
    // değişecek elemanın dizideki sırasını bulur.
    const index = books.findIndex((book) => book.id === editItem.id);
    // kitaplar dizisinin kopyasının oluşturma
    const cloneBooks = [...books];
    // eski kitabı diziden çıkart yerine yenisini koy
    cloneBooks.splice(index, 1, editItem);
    // state'i güncelle> kopya diziyi state aktar.
    setBooks(cloneBooks);

    // modalı kapat
    setShowEditModal(false);
  };

  return (
    <div>
      {/*header*/}
      <div className="bg-dark text-light px-5 py-3 fs-5 text-center">
        Kitap Kurdu
      </div>

      {/* container */}
      <div className="container border">
        {/* form */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 pt-4">
          <input
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            value={bookName}
            type="text"
            className="form-control shadow"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {/* eğer state içerisi boş ise ekrana bunu yaz */}
          {books.length === 0 && <h4>Henüz herhangi bir kitap eklenmedi.</h4>}
          {/* eğer state içerisi boş değilse ekrana bunu yaz */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleDelete={handleDelete}
              handleRead={handleRead}
              handleModal={handleModal}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {/* modalı tanımlama */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Silmek İstiyor Musunuz?</h5>
            <button
              className="btn btn-warning"
              onClick={() => setShowConfirm(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Onayla
            </button>
          </div>
        </div>
      )}
      {/* düzenleme modalı */}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          editItem={editItem}
          setEditItem={setEditItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
