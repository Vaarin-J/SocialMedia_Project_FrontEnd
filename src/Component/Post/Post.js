/* eslint-disable jsx-a11y/alt-text */
import { Avatar } from '@mui/material';
import React, { Component } from 'react';
import "./Post.css" 
//import postimage from "/Users/vaarinjain/Downloads/socialmedia/socialmedia/src/images/post.jpg"
import love from "../../images/love.svg"; 
import comment from "../../images/comment.svg"; 
import share from "../../images/share.svg"; 
import StatusBar from '../StatusBar/StatusBar';
import imageSrc from "../../images/pp1.png"


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            commentList:[]
         }
    }

    componentDidMount(){
        this.getComments();
    }

    getComments=()=>{ //API backend
        
        fetch('https://enterjain-b6e10e8b56bc.herokuapp.com/comment/'+this.props.id)
            .then(response => response.json())
            .then(data => {
                this.setState({commentList: data});
        });
        
    }
    
    submitComments =(event) =>{
        if(event.key == "Enter") {
            let comment=event.currentTarget.value;
            if(comment!= null || comment!=undefined) {

                let payload = {
                    "commentId": Math.floor(Math.random()*1000000).toString(),
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "postId": this.props.id,
                    "timeStamp": new Date().getTime(),
                    "description": comment
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("https://enterjain-b6e10e8b56bc.herokuapp.com/comment",requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.getComments();
                })
                .catch(error =>{
    
                })

            }
        }
    }

    render() { 
        return ( 
        <div className="post__container">
            {/* Header */}
          <div className="post__header">
                <Avatar className="post__image" src={imageSrc} />
                <div className="post__username">{this.props.userName}</div>
          </div>

          {/* Image */}
          <div>
              <img src={this.props.postImage} width="615px" /> 
          </div>

          {/* Analytics */}
          <div>
              <div style={{"marginLeft":"10px"}}>
                  <img src={love}  className="post_reactimage"/>
                  <img src={comment} className="post_reactimage"/>
                  <img src={share} className="post_reactimage"/>
              </div>
              <div style={{ "fontWeight":"bold","marginLeft":"20px  "}}>
                  {this.props.likes} likes     
              </div>
          </div>

          {/* Comment Section */}
          <div>
              {
                  this.state.commentList.map((item,index)=>(
                             index < 4 ?
                        <div className="post_comment">{item.userName}: {item.description}</div> : <span></span>
                  ))
              }
              <input text="text" onKeyPress={this.submitComments} className="post__commentbox" placeholder="Add a comment..." />
              
          </div>
          
        </div> 
        );
    }
}
 
export default Post;