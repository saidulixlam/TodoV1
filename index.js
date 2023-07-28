const forms = document.querySelector('#form');
const list = document.getElementById('list');
const list2=document.getElementById('listdone');
const submit = document.getElementById('submit')
list.className = 'list-items';

const expense = document.querySelector('#expense');
const expdescription = document.querySelector('#description');
const expcategory = document.querySelector('#categories');

forms.addEventListener('submit', formInput);
function formInput(e) {
    e.preventDefault();
    const amount = expense.value;
    const description = expdescription.value;
    const category = expcategory.value;
    //creating object
    const obj = {
        amount,
        description,
        category
    }
    axios.post("https://crudcrud.com/api/d3bf27eba33a4f2f8d69902308479997/expenses", obj)
        .then((res) => {
            showFun(res.data);
            clearInput();
        }).catch((err) => {
            console.log(err);
        })

}
window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/d3bf27eba33a4f2f8d69902308479997/expenses")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showFun(res.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        })
})
function showFun(obj) {
    const li = document.createElement('li');
    li.className = 'li-item float-right my-3 ';

    li.appendChild(document.createTextNode(obj.amount + " - " + obj.description + " - " + obj.category));
    //delete btn
    const dltbtn = document.createElement('button');
    dltbtn.className = 'btn btn-danger mx-2 float-right delete';
    dltbtn.appendChild(document.createTextNode('X'));
    li.appendChild(dltbtn);

    //edit button
    const edtbtn = document.createElement('button');
    edtbtn.className = 'btn btn-success float-right  edit';
    edtbtn.appendChild(document.createTextNode('Done'));
    li.appendChild(edtbtn);

    list.appendChild(li);

    //main.appendChild(list);

    dltbtn.addEventListener('click', funRemove);
    function funRemove() {
        axios.delete(`https://crudcrud.com/api/d3bf27eba33a4f2f8d69902308479997/expenses/${obj._id}`)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        list.removeChild(li);
    }

    edtbtn.addEventListener('click', () => {
        const li = document.createElement('li');
        li.className = 'li-item float-right my-3 ';
    
        li.appendChild(document.createTextNode(obj.amount + " - " + obj.description + " - " + obj.category));
        //delete btn
        const dltbtn = document.createElement('button');
        dltbtn.className = 'btn btn-danger mx-2 float-right delete';
        dltbtn.appendChild(document.createTextNode('X'));
        li.appendChild(dltbtn);
        list2.appendChild(li);
        dltbtn.addEventListener('click',()=>{
            list2.removeChild(li);
        });
       funRemove();

    });

}

function clearInput() {
    expense.value = '';
    expdescription.value = '';
    expcategory.value = '';
    submit.value = "Add Expense"
}
