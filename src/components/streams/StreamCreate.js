import React from "react";
import { Field, reduxForm } from "redux-form";
//ReduxFormを用いることでこのComponentのみでほぼ完結できる
//https://www.slideshare.net/KazuakiOkamoto1/reactredux-form-79152459
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? `error` : ``}`; //Y:error N:""
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  // onChange={formProps.input.onChange}↑これらの代わり
  // value={formProps.input.value}

  onSubmit = (formValues) => {
    this.props.createStream(formValues); //CreateStream?
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)} //handleSubmit?
        className="ui form error"
      >
        {/* ReduxForm特有の書き方 */}
        <Field
          name="title" //フォーム内での識別子
          component={this.renderInput} //タグの種類
          label="Enter title Space" //内容
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must input title!!";
  }
  if (!formValues.description) {
    errors.description = "You must input description!!";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
