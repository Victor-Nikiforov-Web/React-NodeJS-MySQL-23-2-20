import React, { Component, SyntheticEvent } from 'react';
import './App.css';
import { ProductsModel } from './models/products';
import { OffersModel } from './models/offers';
import { SumbitModel } from './models/sumbit-offer';

interface AppState {
  products: ProductsModel[];
  offers: OffersModel[];
  selectedID: number;
  sumbitOffer: SumbitModel;
}
export class App extends Component<any, AppState>{

  public constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      offers: [],
      selectedID: 0,
      sumbitOffer: new SumbitModel()
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => alert(err.message));
  }

  private getOffer = (args: SyntheticEvent) => {
    const selectedID = +(args.target as HTMLSelectElement).value;
    this.setState({ selectedID });
    if(selectedID >= 0){
    fetch(`http://localhost:3000/api/products/${selectedID}`)
      .then(res => res.json())
      .then(offers => this.setState({ offers }))
      .catch(err => alert(err.message));
    }
  }

  private updateName = (args: SyntheticEvent) => {
    const name = (args.target as HTMLSelectElement).value;
    const sumbitOffer = { ...this.state.sumbitOffer };
    sumbitOffer.nameOfUser = name;
    this.setState({ sumbitOffer });
  }
  private updatePrice = (args: SyntheticEvent) => {
    const price = +(args.target as HTMLSelectElement).value;
    const sumbitOffer = { ...this.state.sumbitOffer };
    sumbitOffer.productID = this.state.selectedID;
    sumbitOffer.price = price;
    this.setState({ sumbitOffer });
  }

  private sendOffer = () => {
    console.log(this.state.sumbitOffer)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state.sumbitOffer)
    };

    fetch("http://localhost:3000/api/products", options)
      .then(response => response.json())
      .then(offer => alert('Offer has been added !'))
      .catch(err => alert(err.message));
  }

  public render(): JSX.Element {
    return (
      <div className='app'>
        <select onChange={this.getOffer}>
          <option>Select</option>
          {this.state.products.map(p =>
            <option key={p.id} value={p.id}>{p.name}</option>
          )}
        </select>
        <hr />
        {this.state.offers ?
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>User Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.offers.map(o =>
                <tr key={o.id}>
                  <td>{o.date}</td>
                  <td>{o.nameOfUser}</td>
                  <td>{o.price}</td>
                </tr>
              )}
            </tbody>
          </table>
          : null}
        <hr />
        <form>
          <label>
            Your Name : <input onChange={this.updateName} />
          </label>
          <br />
          <label>
            Price : <input onChange={this.updatePrice} />
          </label>
          <br />
          <button onClick={this.sendOffer}>Send</button>
        </form>
      </div>
    );
  }
}