let r, q, X, L, k, C;
let tree, state, Codes;
const N = 1000;
function generate(){
    r = 0;
    q = 0;
    X = [];
    L = [];
    let alphStr = document.getElementById("alphInput").value.replace(' ','');
    let longStr = document.getElementById("longInput").value.trim();
    if(!alphStr.match('^[0-9a-zA-z]+$') || !longStr.match('^[0-9 ]+$') || (new Set(alphStr)).size !== alphStr.length){
        alert('Ingrese los datos correctamente');
        return;
    }
    X = alphStr.split('');
    L = longStr.split(/\s+/).map(e => parseInt(e, 10));
    L.sort((a, b) => a-b);
    if(L[0] == 0){
        alert('No se permiten longitudes iguales a 0');
        return;
    }
    X.sort();
    r = X.length;
    q = L.length;
    if(L.reduce((a, b) => a + b, 0) > N){
        alert('El código es demasiado grande.');
        return;
    }
    document.getElementById("alphSize").innerHTML = "Tamaño del alfabeto (r): " + String(r);
    document.getElementById("alph").innerHTML = "Alfabeto (X): " + String(X);
    document.getElementById("codeSize").innerHTML = "Tamaño del código(q): " + String(q);
    document.getElementById("long").innerHTML = "Longitudes (L): " + String(L);    
    initialize();    
    generateCode(0,0,L[0],"");
    console.log("# sol:", cont);
    codesStr = ""
    for(let code of Codes){
        for(let i = 0; i < q; i++)
            codesStr += String(code[i] + " ");
        codesStr += String("<br>");
    }
    document.getElementById("numSol").innerHTML = "Soluciones(#C's): " + String(Codes.size);
    document.getElementById("codesDiv").innerHTML = codesStr;
}

function initialize(){
    tree = Array.from(Array(1000), () => new Array(r));
    cont = 0;
    Codes = new Set();
    state = Array(N);
    C = [];
    for(let i=0;i<q;i++)
        C.push("");
    for(let i=0;i<N;i++){
        state[i] = r;
        for(let j=0;j<r;j++){
            tree[i][j] = -1;
        }
    }
    k = 1;
}

function generateCode(u, i, l, str){
    if(i==q){
        //console.log(C);
        Codes.add(C.slice());
        return;
    }
    if(l==0){
        if(state[u]===r){
            state[u] = -1;
            C[i] = str;
            generateCode(0,i+1,L[i+1], "");
            state[u] = r;  
        }    
        return;
    }
    if(state[u] === -1){
        return;
    }
    for(let j=0;j<r;j++){
        if(tree[u][j] == -1){
            v = k;
            k++;
            tree[u][j] = v;
            generateCode(v,i,l-1, str + String(X[j]));
            k--;
            tree[u][j] = -1;
        }else{
            v = tree[u][j];
            generateCode(v,i,l-1, str + String(X[j]));
        }
    }
}
//deprecated
function dfs(u, st){
    if(state[u] === -1){
        C.push(st);
        return;
    }
    for(let j=0;j<r;j++){
        if(tree[u][j] > -1){
            dfs(tree[u][j], st + String(X[j]));
        }
    }
}
function msj(msj,...arguments){
    console.log(msj,arguments);
}
function db(argument){
    console.log(argument);
}
