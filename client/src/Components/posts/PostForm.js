import React, {useState} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addPost} from "../../actions/post";

const PostForm = ({addPost}) => {
    const [text, setTextForm] = useState('');
    const onSubmit = (e) =>{
        e.preventDefault();
        addPost({text});
        setTextForm('');
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>onSubmit(e)}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
              value={text}
              onChange={(e)=>setTextForm(e.target.value.toString())}
          ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null,{addPost})(PostForm);
