async function  phone(name,isshowAll) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    const phonedetails = data.data;
    // console.log();
    showPhone(phonedetails,isshowAll);
}
const showPhone = (phonedetails,isshowAll) => {
    // console.log(phonedetails);
    const phoneCard = document.getElementById('card-container');
    const lengthnumber = phonedetails.length;
    const btn_hide = document.getElementById('hide-btn');
    if (lengthnumber > 6 && !isshowAll) {
        
        btn_hide.classList.remove('hidden');
    }
    else {
        btn_hide.classList.add('hidden');
    }
    // console.log("is show all :", isshowAll);

    // console.log(isshowAll);
    if (!isshowAll) {
        phonedetails = phonedetails.slice(0, 6);
    }
    phoneCard.textContent = '';
    phonedetails.forEach((singleInfo) => {
        console.log(singleInfo);
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-base-100 shadow-xl`;
        cardDiv.innerHTML = `
        <figure><img src="${singleInfo.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${singleInfo.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick = "modalDetails('${singleInfo.slug}')">Show Details</button>
          </div>
        </div>
      </div>
        `
        phoneCard.appendChild(cardDiv);

    })
    toggoleSpinner(false);
}

const modalDetails = async(id) => {
    // console.log(id);
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}

const handleButton = (isshowAll) => {
    // console.log('button is clicked');
    toggoleSpinner(true);
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    // console.log(searchText);
    // console.log(isshowAll);
    phone(searchText, isshowAll);
    

}

const toggoleSpinner = (isLoading) => {
    const result = document.getElementById('spinner');
    if (isLoading) {
        result.classList.remove('hidden');
    } else {
        result.classList.add('hidden');
    }
}

const showAll = () => {
    handleButton(true);
}