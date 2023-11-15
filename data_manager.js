
const API_URL = "https://jsonplaceholder.typicode.com";
const API_POSTS_URL = API_URL + "/posts"

export class DataListManager {
  constructor(elementId) {
    this.dataList = document.getElementById(elementId);
    this.posts = [];
    this.dataImage = document.getElementById("defaultImage");
    this.variantInput = document.getElementById("get-variant");
    this.refreshDataImage();
  }

  async getData() {
    try {
      const response = await axios.get(API_POSTS_URL);
      if (response.status === 200) {
        this.clearData();
        this.posts = response.data;
        this.addAllItems();
        this.refreshDataImage();
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  }

  async getDataWithVariant() {
    const selectedVariant = parseInt(this.variantInput.value, 10);

    try {
      const response = await axios.get(API_POSTS_URL, {   params: {  _limit: selectedVariant  } });
      if (response.status === 200) {
        this.clearData();
        this.posts = response.data;
        this.addAllItems();
        this.refreshDataImage();
      } else {
        console.error(`Błąd podczas pobierania wiadomości: status ${response.status}`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych z wariantem:", error);
    };
  }

  refreshDataImage() {
    if (this.posts.length == 0) {
      this.dataImage.style.display = "block";
    } else {
      this.dataImage.style.display = "none";
    }
  }

  clearData() {
    this.dataList.innerHTML = "";
    this.posts = [];
    this.refreshDataImage();
  }

  addAllItems() {
    this.posts.forEach((item) => this.addItem(item));
  }

  rebuildList() {
    this.dataList.innerHTML = "";
    this.addAllItems()
  }

  addItem(item) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.id = `post-${item.id}`;

    const content = document.createElement("div");
    content.classList.add("list-item-content");
    content.textContent = `${item.id}. ${item.title}`;
    listItem.appendChild(content);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("list-item-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.onclick = () => this.openEditModal(item);
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.onclick = () => this.deleteItem(item.id);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(buttonContainer);
    this.dataList.appendChild(listItem);
  }

  openEditModal(item) {
    // TODO: wrzucić te getElementy i ich setup do konstruktora
    const editModal = document.getElementById("editModal");
    const editTitleInput = document.getElementById("editTitle");
    const editBodyInput = document.getElementById("editBody");
    const saveButton = document.getElementById("saveEdit");
    const closeButton = document.querySelector("#editModal .close");

    editTitleInput.value = item.title;
    editBodyInput.value = item.body;

    editModal.style.display = "block";

    saveButton.onclick = () => {
        editModal.style.display = "none";
        this.editItem({id: item.id, body: editBodyInput.value, title : editTitleInput.value, userId: item.userId });
    };

    closeButton.onclick = () => {
      editModal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target == editModal) {
        editModal.style.display = "none";
      }
    };
  }

  async editItem(item) {
    try {
      const response = await axios.patch(API_POSTS_URL + `/${item.id}`, JSON.stringify(item));
      if (response.status == 200) {
        let postToEdit = this.posts.find(post => post.id === item.id);
        postToEdit.title = item.title;
        postToEdit.body = item.body;
        this.rebuildList();
      } else {
        console.error(`Bład przy metodzie PATCH status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Bład przy metodzie PATCH ${error}`)
    }
  }

  async deleteItem(itemId) {
    const itemToRemove = this.posts.findIndex(
      (item) => item.id === itemId
    );
    if (itemToRemove !== -1) {
      this.posts.splice(itemToRemove, 1);
      try {
        const response = await axios.delete(API_POSTS_URL + `/${itemId}`);
        if (response.status === 200) {
          const listItem = document.getElementById(`post-${itemId}`);
          this.dataList.removeChild(listItem);
          this.refreshDataImage();
        } else {
          console.error(`Nie udalo sie usunac postu status: ${response.status}`)
        }
      } catch (error) {
        console.error(`Blad podczas metody DELETE: ${error}`);
      }
    }
  }

  searchData() {
    // TODO: przeniesc ten getElementById do konstruktora
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = this.posts.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
    this.clearData();
    filteredData.forEach((item) => this.addItem(item));
    this.refreshDataImage();
  }

  async addOneMoreData() {
    const currentLength = this.posts.length || 0;
    try {
      if (currentLength >= 100) {
        alert("Osiągnięto maksymalną liczbę wyników");
      } else {
        const nextPostId = currentLength + 1;
        const requestString = API_POSTS_URL + "/" + nextPostId;
        const response = await axios.get(requestString);
        if (response.status === 200) {
          this.posts.push(response.data);
          this.addItem(response.data);
          this.refreshDataImage();
        } else {
          console.log("Status: ", response)
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Osiągnięto maksymalną liczbę wyników");
      } else {
        console.error("Błąd podczas dodawania jednego wyniku:", error);
      }
    };
  }
}
