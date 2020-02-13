class Node {
    constructor(value){
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(node){
        this.root = node;
        this.i = 0;
        
    }
    
    // Insert Node
    insert(node, root){
        if (node.value == root.value){
            return ;
        }
        else if(node.value < root.value){
            // check if left subtree is null
            if (root.left != null){
                this.insert(node, root.left);  
            }
            else{
                root.left = node;
                node.parent = root;
            }
        } else {
            // check if right subtree is null
            if (root.right != null){
                this.insert(node, root.right); 
            }
            else{
                root.right = node; 
                node.parent = root;
            }
        }    
    }

    

    

    recGet(node, i) {
      if (node === null) return null;
      var n = {
        name: "lol",
        value: node.value,
        children: [],
        i: this.i, 
        visible: true
      };
      this.i += 1;
      var l = this.recGet(node.left)
      var r = this.recGet(node.right)

      if (l !== null) n.children.push(l);
      if (r !== null) n.children.push(r);

      return n;
    }
    getObject(){
      return this.recGet(this.root);
    }
}