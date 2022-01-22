import React, { Component } from "react";
import { Form, Input, TimePicker } from "antd";
import moment from "moment";
import "./Home.css";
import Axios from "axios";
const data = require("../languageProvider/locales/en_US.json"); //text content from JSON
const format = "HH:mm";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_code: "",
      booking_code_data: "",
      time: "",
      timeString: "",
    };
    this.onInputHandler = this.onInputHandler.bind(this);
    this.getBookingData = this.getBookingData.bind(this);
    this.onChangeTimePicker = this.onChangeTimePicker.bind(this);
  }
  //only alphanumerical Rule
  onInputHandler(e) {
    const re = /^[a-z0-9]+$/i;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
    this.setState({ booking_code: e.target.value.toUpperCase() });
  }

  //time picker handler
  onChangeTimePicker(time, timeString) {
    //post time picker into API
    Axios.put(
      `https://bv-online-assessment.herokuapp.com/api/bookings/${this.state.booking_code}/update-eta`,
      {
        arrival_time: timeString.toString(),
      }
    ).then(() => {
      //re-get booking data from API
      Axios.get(
        `https://bv-online-assessment.herokuapp.com/api/bookings/${this.state.booking_code}`
      ).then((res) => {
        this.setState({ booking_code_data: res.data });
      });
    });
  }

  //input booking data handler
  getBookingData() {
    //get booking data from API
    Axios.get(
      `https://bv-online-assessment.herokuapp.com/api/bookings/${this.state.booking_code}`
    ).then((res) => {
      this.setState({ booking_code_data: res.data });
    });
  }

  render() {
    return (
      <div>
        {/* input form component */}
        <Form
          className="form-layout"
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={this.getBookingData}
          autoComplete="off"
        >
          <Form.Item className="form-label">
            {data["home.content"]}
            <br />
            <Input
              className="form-input"
              size="large"
              type="text"
              style={{ textTransform: "uppercase" }}
              onKeyPress={(e) => this.onInputHandler(e)}
            />
          </Form.Item>
        </Form>

        {/* booking data detail */}
        {this.state.booking_code_data && (
          <div className="form-detail">
            {/* Image */}
            <div>
              <img src={this.state.booking_code_data.profile_picture} alt="" />
            </div>
            <br />

            {/* Name */}
            <div>Hi, {this.state.booking_code_data.guest_name}</div>

            <div>
              Thank you for booking with Bukit Vista, Here are the details of
              your current booking:
            </div>

            <br />
            {/* Data */}
            <div>
              Property name: {this.state.booking_code_data.property_name}
            </div>
            <div>
              Check in date: {this.state.booking_code_data.check_in_date}
            </div>
            <div>
              Check out date: {this.state.booking_code_data.check_out_date}
            </div>

            {/* arrival time */}
            {!this.state.booking_code_data.arrival_time ? (
              // input new arrival time
              <div>
                Arrival time:{" "}
                <TimePicker
                  defaultValue={moment("00:00", format)}
                  format={format}
                  onChange={this.onChangeTimePicker}
                />{" "}
                (please set your arrival time)
              </div>
            ) : (
              //get arrival time
              <div>
                Arrival time: {this.state.booking_code_data.arrival_time} (Thank
                you, your host has been informed about your arrival)
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
