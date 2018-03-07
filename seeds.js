var mongoose        = require("mongoose");
var Culinaryground=require("./models/culinaryground");
var Comment=require("./models/comment");

var data = [
        {   
            name:"Silent Hill",
            image:"https://farm4.staticflickr.com/3129/2614431976_71ac060c3f.jpg",
            desc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
        },{
            name:"Granite Hill",
            image:"https://farm7.staticflickr.com/6120/6377165577_d84940600a.jpg",
            desc:"But I must explain to you how all this mistaken idea of denouncing pleasure "
        },{
            name:"Cloud's rest",
            image:"https://farm6.staticflickr.com/5490/14333729818_c0dd974898.jpg",
            desc:"eos et accusamus et iusto odio dignissimos ducimus qui blanditiis"
        },{
            name:"Knights Watch",
            image:"https://farm4.staticflickr.com/3833/10351498516_b896f62bb7.jpg",
            desc:"who do not know how to pursue pleasure rationally encounter consequences "
        }
    ]

function seedDB(){
    //remove all camps
    Culinaryground.remove({},function(err){
        // if (err) {
        //     console.log(err);
        // }else{
        //     console.log("removed!!!!");
        // }
        
        // //add feew campgrounds
        // data.forEach(function(seed){
        //     Culinaryground.create(seed,function(err,culinaryground){
        //             if (err) {
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("added campgrnd");
        //                 //Create a comment
        //                 Comment.create(
        //                     {
        //                         text:"This is great except withoout internet",
        //                         author:"Harry"
        //                     },function(err,comment){
        //                         if (err) {
        //                             console.log(err);
        //                         }else{
        //                             culinaryground.comments.push(comment);
        //                             culinaryground.save();
        //                             console.log("created new comment");
        //                         }
        //                 });
        //             }
        //         }
        //     );
        // });
    });
    
}

module.exports = seedDB;