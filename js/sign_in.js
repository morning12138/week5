$(function () {

    //settings
    const setting_get = {
        method: "GET"
    }
    const setting_post = {
        method: "POST"
    }
    //张宇杭超帅

    //variables
    let input_school_number = $('#input-value');
    let button_signin = $('#sign-in');
    let button_showList = $('#show-list');
    let list = $('.list-container')
    let data = [];

    function addDiv(number, name) {
        let temp = ` <div class="list-line">
                        <img src="./img/signin.svg" class="icon" />
                        <div>
                            <div>学号：`;
        console.log(temp)
        temp += `${number}`;
        temp += `</div>
                <div>姓名：`;
        temp += `${name}`;
        temp += `</div>
                </div></div>`;
        console.log(temp)
        return temp;
    }

    //if you want to use async and await
    async function getSignInList_another() {
        let url = `http://mock.benchbeach.xyz/mock/5fa937e1a2727e244b4728d0/api/getSignInList`;
        console.log(data.length)
        if (data.length === 0) {
            let res = await fetch(url, setting_get);
            let res_to_json = await res.json();
            spop(`<h4 class="spop-title">获取成功~</h4>`, 'success');
            data = res_to_json.data;
            console.log(data)
            for (let i = 0; i < 10; i++) {
                list.append(addDiv(data[i].user_id, data[i].name))
            }
        } else {
            spop(`<h4 class="spop-title">已经获取过一次了！</h4>`, 'error');
        }
    }
    async function signIn_another() {
        let school_number = input_school_number.val().trim();
        let url = `http://mock.benchbeach.xyz/mock/5fa937e1a2727e244b4728d0/api/signIn?school_number=${school_number}`
        let res = await fetch(url, setting_post);
        let res_to_json = await res.json();
        if (res_to_json.status === 'success') {
            spop(`<h4 class="spop-title">${res_to_json.data.name}签到成功</h4>`, 'success');
            for (let i = 0; i < 10; i++) {
                if (school_number == data[i].user_id) {
                    $(`.list-line:nth-child(${i+1})`).css("display", "none")
                }
            }
        } else {
            spop(`<h4 class="spop-title">${res_to_json.data.name}查无此人~</h4>`, 'warning');
        }
        console.log(res_to_json);
    }

    //normal promise
    function getSignInList() {
        let url = `http://mock.benchbeach.xyz/mock/5fa937e1a2727e244b4728d0/api/getSignInList`;
        fetch(url, setting_get)
            .then((res) => {
                res.json().then((res_to_json) => {
                    console.log(res_to_json);
                })
            })
    }

    function signIn() {
        let school_number = input_school_number.val().trim();
        let url = `http://mock.benchbeach.xyz/mock/5fa937e1a2727e244b4728d0/api/signIn?school_number=${school_number}`
        fetch(url, setting_post)
            .then((res) => {
                res.json().then((res_to_json) => {
                    console.log(res_to_json);
                })
            })
    }

    button_signin.on('click', signIn_another);
    button_showList.on('click', getSignInList_another);

    addDiv()
})