export class ElementList extends HTMLElement {

    _list = this.getAttribute('elements').split(',');
    _listCopy = [...this._list];
    _removedItems = [];

    constructor() {
        super();

        // Attaching element to shadow dom
        const shadowRoot = this.attachShadow({mode: 'open'});

        this.render();
    }

    _getRandomNumber() {
        return Math.floor(Math.random() * this._listCopy.length);
    }

    _template() {
        const template = `
            <style>
                div {
                    border: 1px solid black;
                    margin: 20px;
                    padding: 20px;
                    max-width: 350px;
                }
            </style>
            <div>
                <h2>List of items</h2>
                <ul>
                    ${this._listCopy.map(item => "<li>" + item + "</li>").join("")}
                </ul>
                <button id="removeButton">Remove Item</button>
                <button id="resetButton">Reset List</button>

                <h2>List of removed items</h2>
                <ol>
                    ${
                        this._removedItems.map(item => '<li>' + item + "</li>").join('')
                    }
                </ol>
            </div>
        `;

        return template;
    }

    _addEventListeners() {
        const removeButton = this.shadowRoot.getElementById('removeButton');
        const resetButton = this.shadowRoot.getElementById('resetButton');

        removeButton.addEventListener('click', () => {
            this.removeItem()
        });

        resetButton.addEventListener('click', () => {
            this.resetList();
        })
    }

    removeItem() {
        if(this._listCopy.length < 1) {
            console.error('no item in list');
            return;
        }

        const removedItem = this._listCopy.splice(this._getRandomNumber(), 1);
        this._removedItems.push(removedItem);

        this.render();
    }

    resetList() {
        this._listCopy = [...this._list];
        this._removedItems = [];
        this.render();
        console.warn('List have been reset');
    }

    render() { 
        this.shadowRoot.innerHTML = this._template();
        this._addEventListeners();
    }
}
customElements.define('element-list', ElementList);