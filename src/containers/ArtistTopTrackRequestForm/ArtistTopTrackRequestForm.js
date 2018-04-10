import React, {Component} from 'react';

import axios from '../../axios-requests';
import Spinner from '../../components/UI/Spinner/Spinner';
import RequestNotification from '../../components/UI/RequestNotification/RequestNotification';

class ArtistTopTrackRequestForm extends Component {
    state = {
        formData: {
            artistName: {
                value: ''
            },
            cellPhoneNumber: {
                value: ''
            }
        },
        loading: false,
        message: null,
        notificationType: null,
        removeNotification: true
    }

    inputChangedHandler = (event, elementIdentifier) => {
        const updatedFormData = {
            ...this.state.formData
        };
        const updatedFormElement = {
            ...updatedFormData[elementIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormData[elementIdentifier] = updatedFormElement;

        this.setState({formData: updatedFormData});
    }

    requestHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const requestData = {
            artist_name: this.state.formData['artistName'].value,
            cell_phone_number: this.state.formData['cellPhoneNumber'].value
        };

        axios
            .post('/artist_top_track_requests', requestData)
            .then((response) => {
                let msg = 'Your request has been submitted successfully.';
                let noteType = 'success';

                if (response.data['sms_status'] !== 'queued') {
                    msg = 'There was an error submitting your request. Please review the information you provided.';
                    noteType = "danger";
                }

                this.setState({
                    loading: false, 
                    message: msg, 
                    notificationType: noteType,
                    removeNotification: true });
            })
            .catch((e) => {
                this.setState({
                    loading: false, 
                    message: e.message, 
                    notificationType: 'danger',
                    removeNotification: false});
            })
    }

    removeNotificationHandler = () => {
        setTimeout(() => {
            this.setState({message: null, notificationType: null})
        }, 5000);
    }

    render() {
        let formAction = <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

        if (this.state.loading) {
            formAction = <Spinner/>
        }

        let notification = null;

        if (this.state.notificationType && this.state.message) { 
            notification = <RequestNotification 
                cancelNotification = { this.removeNotificationHandler }
                remove = {this.state.removeNotification}
                notificationType = { this.state.notificationType }
                message = { this.state.message } />
        }

        return (
            <form className="form-signin" onSubmit={this.requestHandler}>

                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Demo Tape</h1>
                    <p>Enter the name of your favorite artist name and your phone number, and info
                        on the the artist's top 3 songs will be SMS to the number you provide.
                    </p>
                </div>

                {notification}

                <div className="form-label-group">
                    <input
                        type="text"
                        id="artistName"
                        className="form-control"
                        placeholder="Artist name"
                        required
                        autoFocus
                        onChange={(event) => this.inputChangedHandler(event, "artistName")}/>
                    <label htmlFor="artistName">Artist name</label>
                </div>

                <div className="form-label-group">
                    <input
                        type="tel"
                        id="cellPhoneNumber"
                        className="form-control"
                        placeholder="Cell phone number"
                        required
                        onChange={(event) => this.inputChangedHandler(event, "cellPhoneNumber")}/>
                    <label htmlFor="cellPhoneNumber">Cell phone number</label>
                </div>

                {formAction}
            </form>
        );
    }
}

export default ArtistTopTrackRequestForm;