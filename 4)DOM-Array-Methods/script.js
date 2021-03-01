const main = document.getElementById('main')
const addUserBtn = document.getElementById('add_user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show_millionaires')
const calculateWealthBtn = document.getElementById('calculate_wealth')
const sortBtn = document.getElementById('sort')

let userList = []

getRandomUser(3);

async function getRandomUser(count) {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`)
    const data = await res.json()

    for(const user of data.results) {
        const newUser = {
            name : `${user.name.first} ${user.name.last}`,
            money : Math.floor(Math.random() * 100000000),
        }

        addUser(newUser);
    }
}


function addUser(user) {
    userList.push(user);

    updateDOM();
}

function doubleMoney() {
    userList = userList.map(user => {
        return { ...user, money : user.money*2 };
    });

    updateDOM();
}

function sortByWealth() {
    userList.sort((a,b) => b.money-a.money);

    updateDOM();
}

function showMillionaires() {
    const millionaires = userList.filter(user => user.money > 100000000);

    updateDOM(millionaires);
}

function calculateWealth() {
    const wealth = userList.reduce((acc, user)=>(acc+user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement);
}

function updateDOM(providedData = userList) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(money) {
    return money.toLocaleString('ko-KR') + '₩';
    // return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '₩';
}



addUserBtn.addEventListener('click', () => getRandomUser(1));
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);