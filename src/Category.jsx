import { Component } from 'react';

let categories = ["Nature", "City", "Technology", "Food", "Still Life", "Abstract", "Wildlife"]

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonDisabled: false,
            categorySelected: false
        }
    }

    convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);

        });

    }

    fetchImageUrl(category) {

        const apiURL = `https://api.api-ninjas.com/v1/randomimage?category=${category}`
        const apiKEY = "Ahrf2hfMtvO0aaGf1NPNdvCqoEzfEBc3ocFurfGG"

        fetch(apiURL, {
            headers: {
                'x-api-key': apiKEY,
                'Accept': 'image/jpg'
            }
        })
            .then((response) => { return response.blob() })
            .then((data) => { return this.convertBlobToBase64(data) })
            .then((base64data) => {
                this.setState({
                    imageURL: base64data
                })
            })
            .catch((e) => {
                alert('Error Occured, Check console')
                console.error(e);
            })


    }

    render() {
        return (
            <>
                {categories.map((category, index) => {
                    return (
                        <button key={`${category}Btn`} className='categoryBtn' disabled={this.state.buttonDisabled} onClick={() => {
                            this.setState({
                                buttonDisabled: true,
                                categorySelected: category
                            })
                            this.fetchImageUrl(category)
                        }}>{category}</button>
                    )
                })}
                <button className='categoryBtn' onClick={() => {
                    this.setState({
                        buttonDisabled: false,
                        categorySelected: false,
                        imageURL: "None"
                    })
                }}>RESET</button>
                <br></br>
                <img alt={!(this.state.categorySelected) ? "None" : `${this.state.categorySelected} image loading...`} className='imagegen' src={this.state.imageURL}></img>
            </>

        )
    }
}
