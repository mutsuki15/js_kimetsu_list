const characterList = document.querySelector('.character');
const loading = document.querySelector('.loading');

// ローディング画面の表示・非表示
function startLoading() {
  loading.style.display = 'flex';
}
function endLoading() {
  loading.style.display = 'none';
}

// ラジオボタンの切り替え処理
const radioButtons = document.querySelectorAll('input[type=radio]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', function() {
    startLoading();
    fetchCharacters(this.id);
  });
});

// apiを取得し、取得したキャラクターデータを表示する関数の呼び出し
async function fetchCharacters(category) {
  const api = await fetch(`https://ihatov08.github.io/kimetsu_api/api/${category}.json`);
  const json = await api.json();
  endLoading();
  displayCharacters(json);
}

// キャラクターデータの表示
function displayCharacters(characters) {
  characterList.innerHTML = '';
  characters.forEach(function(character) {
    const characterItem = document.createElement('div');
    characterItem.classList.add('col-md-4');
    characterItem.innerHTML = `
      <div class="character-item">
        <img src="https://ihatov08.github.io${character.image}" class="img-fluid mb-2">
        <p>${character.name}</p>
        <p>${character.category}</p>
      </div>
    `;
    characterList.appendChild(characterItem);
  });
}

// 初期ページのキャラクターデータの表示
fetchCharacters('all');