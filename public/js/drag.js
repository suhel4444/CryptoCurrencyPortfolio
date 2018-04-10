$(init);
var count = 0;
function init()
{
    $(".icons1").draggable();
    $(".wallet2").droppable({
    	drop: function(event, ui) {
    		var curr=$(ui.draggable).clone();
    		$(this).append(curr);
    		count = count + 1;
    		console.log("Count " + count);
    	}
    });
    $(".wallet2").droppable({
    	out: function(event, ui) {
    		count = count - 1;
    		console.log("Count " + count);
    		$(this).remove();
    	}
    })

    // $(".wallet2").bind("drop", walletdropped);
    // $(".wallet2").bind("dropout", walletdragged);
}
// {helper:'clone'}
// function walletdropped(event, ui)
// {
//     	accept: ".icons1",
//     	count = count + 1;
//     	console.log("Count " + count);
    	// var curr=$(ui.draggable).clone();
    	// $(this).append(curr);
// }

// function walletdragged(event, ui)
// {
// 		accept: ".icons1",
// 		count = count - 1;	
// 		console.log("Count " + count);
// }


    // $(".wallet2").droppable({
        // accept: ".icons1",
        // drop: function(ev,ui){
        //     count = count + 1;
        //     console.log("Count " + count);
        //     var curr=$(ui.draggable).clone();
        //     $(this).append(curr);
    //     }
    // });
    // $(".wallet2").on("dropout", function(ev, ui) {
    //     	count = count - 1;
    // });
    // $(".wallet2").droppable({
    // 	out: function(ev, ui){
    // 		count = count - 1;	
    // 	}
    // });
    // console.log("Count " + count);
