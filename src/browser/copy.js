(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  // 该方式无论元素是否可编辑，均可复制其内容
  const copyBySelectionApi = ()=>{
    const selection = window.getSelection();
    const range = document.createRange();  

    if(selection.rangeCount > 0){
      selection.removeAllRanges();
    }

    range.selectNode(selectedNode);
    selection.addRange(range);
    document.execCommand('copy'); 
    
    selection.removeAllRanges();
  }

  function copy(el){
    let selectedNode = el;
    if(toString.call(selectedNode) === '[object String]'){
      selectedNode = document.querySelector(selectedNode);
    }
  
    if(navigator.clipboard?.writeText){
      let value = selectedNode.innerText;
      if(['TEXTAREA','INPUT'].includes(selectedNode.tagName)){
        value = selectedNode.value;
      }
      // 该方式需针对元素是否可编辑，做不同的获取
      navigator.clipboard.writeText(value).catch((err)=>{
        console.log('call clipboard api failure,', err);
        copyBySelectionApi();
      }); 
    }else{
      copyBySelectionApi();
    }
  }

  context.copy = copy;

})(window);

