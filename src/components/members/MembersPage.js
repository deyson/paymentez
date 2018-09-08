import React, { PureComponent } from 'react';


class Members extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: '',
      messageButton: 'Guardar',
    };
  }
  componentWillMount() {
    window.Paymentez.init('stg', 'EXITO-CO-CLIENT', 'L0KxqMO32mRSBZkzkY71hG4dUWwPLM');
  }

  save = (e) => {
    const myCard = window.$('#my-card');
    this.setState({
      messages: '',
      messageButton: 'Guardar',
    });
    const cardToSave = myCard.PaymentezForm('card');
    if (cardToSave == null) {
      this.setState({
        messages: 'Invalid Card Data',
      });
    } else {
      this.setState({
        messageButton: 'Card Processing...',
      });

      const uid = 'uid1234';
      const email = 'dev@paymentez.com';
      /* Add Card converts sensitive card data to a single-use token which you can safely pass to your server to charge the user.
         *
         * @param uid User identifier. This is the identifier you use inside your application; you will receive it in notifications.
         * @param email Email of the user initiating the purchase. Format: Valid e-mail format.
         * @param card the Card used to create this payment token
         * @param success_callback a callback to receive the token
         * @param failure_callback a callback to receive an error
         */
      window.Paymentez.addCard(uid, email, cardToSave, this.successHandler, this.errorHandler);
    }
    e.preventDefault();
  }

  successHandler = (cardResponse) => {
    console.log(cardResponse.card);
    if (cardResponse.card.status === 'valid') {
      const message = `${'Card Successfully Added<br>' +
                    'status: '}${cardResponse.card.status}<br>` +
                    `Card Token: ${cardResponse.card.token}<br>` +
                    `transaction_reference: ${cardResponse.card.transaction_reference}`;
      this.setState({
        messages: message,
      });
    } else if (cardResponse.card.status === 'review') {
      const message = `${'Card Under Review<br>' +
                    'status: '}${cardResponse.card.status}<br>` +
                    `Card Token: ${cardResponse.card.token}<br>` +
                    `transaction_reference: ${cardResponse.card.transaction_reference}`;
      this.setState({
        messages: message,
      });
    } else {
      const message = `${'Error<br>' +
                    'status: '}${cardResponse.card.status}<br>` +
                    `message Token: ${cardResponse.card.message}<br>`;
      this.setState({
        messages: message,
      });
    }
    this.setState({
      messageButton: 'Guardar',
    });
  }

  errorHandler = (err) => {
    this.setState({
      messages: err.error.type,
      messageButton: 'Guardar',
    });
  }

  render() {
    return (
      <div className="panel">
        <form id="add-card-form">
          <div className="paymentez-form" id="my-card" data-capture-name="true" />
          <button className="btn" onClick={this.save}> { this.state.messageButton }</button>
          <br />
          <div>
            { this.state.messages }
          </div>
        </form>

      </div>);
  }
}

export default Members;
