const forms = document.querySelector('#form');
const list = document.getElementById('list');
const list2 = document.getElementById('listdone');
const submit = document.getElementById('submit')
list.className = 'list-items';
list2.className = 'list-items';
const expense = document.querySelector('#expense');
const expdescription = document.querySelector('#description');
const expcategory = document.querySelector('#categories');

forms.addEventListener('submit', formInput);
function formInput(e) {
    e.preventDefault();
    const amount = expense.value;
    const description = expdescription.value;
    const category = expcategory.value;
    const obj = {
        amount,
        description,
        category
    }
    axios.post("https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expenses", obj)
        .then((res) => {
            showFun(res.data);
            clearInput();
        }).catch((err) => {
            console.log(err);
        })
}
function showFun(obj) {
    const li = document.createElement('li');
    li.className = 'li-item float-right my-3 ';
    li.appendChild(document.createTextNode(obj.amount + " - " + obj.description + " - " + obj.category));

    const dltbtn = document.createElement('button');
    dltbtn.className = 'btn btn-danger mx-2 float-right delete';
    dltbtn.appendChild(document.createTextNode('X'));
    li.appendChild(dltbtn);

    const edtbtn = document.createElement('button');
    edtbtn.className = 'btn btn-success float-right  edit';
    edtbtn.appendChild(document.createTextNode('Done'));
    li.appendChild(edtbtn);
    list.appendChild(li);
    dltbtn.addEventListener('click', () => {
        list.removeChild(li);
        deleteFunction(obj._id)
    });
    edtbtn.addEventListener('click', () => {
        list.removeChild(li);
        editFunction(obj);
    });
}

function deleteFunction(id) {
    axios.delete(`https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expenses/${id}`)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

}

function editFunction(obj) {
    const user = {
        amount: obj.amount,
        description: obj.description,
        category: obj.category
    }
    axios.post("https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expense", user)
        .then((res) => {

            show(res.data);
            clearInput();
        }).catch(err => console.log(err))
    deleteFunction(obj._id);
}

function show(user) {
    const l = document.createElement('li');
    l.className = 'li-item float-right my-2';
    l.appendChild(document.createTextNode(user.amount + " - " + user.description + " - " + user.category));
    const dltbtn = document.createElement('button');
    dltbtn.className = 'btn btn-danger mx-2 float-right delete';
    dltbtn.appendChild(document.createTextNode('X'));
    l.appendChild(dltbtn);
    list2.appendChild(l);
    dltbtn.addEventListener('click', () => {

        axios.delete(`https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expense/${user._id}`)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        list2.removeChild(l);
    })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expense")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                show(res.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        })
})

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/cbd2f78c52e84167963e9d767327ab2c/expenses")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showFun(res.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        })
})

function clearInput() {
    expense.value = '';
    expdescription.value = '';
    expcategory.value = '';
    //submit.value = "Add ta"
}
