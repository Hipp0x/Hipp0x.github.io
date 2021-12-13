function setup() {
  createCanvas(600, 600);

  create_input();
}

function draw() {
  clear();

  var gg = g.value();
  if (gg == ""){
    gg = 0;
  } else if (gg.length > 1){
    gg = gg.charAt(0);
  }
  var hh = h.value();
  if (hh == ""){
    hh = 0;
  }else if (hh.length > 1){
    hh = hh.charAt(0);
  }
  var ii = i.value();
  if (ii == ""){
    ii = 0;
  }else if (ii.length > 1){
    ii = ii.charAt(0);
  }

  let tab = [];
  tab.push( ["a", 4] );
  tab.push( ["b", 3] );
  tab.push( ["c", 2] );
  tab.push( ["d", 9] );
  tab.push( ["e", 3] );
  tab.push( ["f", 6] );
  tab.push( ["g", int(gg)] );
  tab.push( ["h", int(hh)] );
  tab.push( ["i", int(ii)] );

  print_result(tab);
}

function create_input(){

  g = createInput("3");
  g.position(380, 250);
  g.size(30);

  h = createInput("4");
  h.position(380, 300);
  h.size(30);

  i = createInput("2");
  i.position(380, 350);
  i.size(30);

}

function concat_lists(l1, l2, l3, lp) {
  let a = l1.push(lp);
  if (l2 == []) {
    if (l3 == []) {
      return a;
    } else {
      return l3.push(a);
    }
  } else {
    let b = l2.push(a);
    if (l3 == []) {
      return b;
    } else {
      return l3.push(b);
    }
  }
}

function add(l1, l2){
  if (l1.length >= 1){
    for (let i = 0; i < l2.length;i++){
      l1.push(l2[i]);
    }
    return l1;
  }
  return l2;
}

// return the element with the biggest area in the list l
function find_pivot(l) {
  if (l == []) {
    return [];
  } else {
    let elem = 0;
    let index = 0;
    let max = 0;
    for (let i = 0; i < l.length; i++) {
      if (l[i][1] > max) {
        elem = l[i][0];
        max = l[i][1];
        index = i;
      }
    }
    return [elem, max, index];
  }
}

function take_last_n_elem(n, l) {
  let nv_list = [];
  for (let i = n; i < l.length; i++) {
    nv_list.push(l[i]);
  }
  return nv_list;
}

//returns the sum of all the areas of the list
function sum_areas(l) {
  let comp = 0;
  for (let i = 0; i < l.length; i++) {
    comp += l[i][1];
  }
  return comp;
}

function ratio(r) {
  return r[2] / r[3];
}

// returns the average ratio of the list that has exactly 3 elements
function average_ratio(list) {
  if (list == []) {
    return 0;
  } else {
    let cont = 0;
    for (let i = 0; i < list.length; i++) {
      let r = list[i][1];
      cont += ratio(r);
    }
    return cont;
  }
}

function list_split(list, pos) {
  let l = [];
  for (let i = 0; i < list.length; i++) {
    l.push(list[i][pos]);
  }
  return l;
}

//make a snake layout to fill the rectangle r with the 3 elements a, b and c *)
function make_snake3(l, r) {
  let elements = list_split(l, 0);
  let areas = list_split(l, 1);
  let s_a = areas[0];
  let s_b = areas[1];
  let s_c = areas[2];
  let sum = s_a + s_b + s_c;
  let ratio1 = s_a / sum;
  let ratio2 = s_b / sum;
  let ratio3 = s_c / sum;
  if (ratio(r) >= 1) {
    let r1 = [r[0], r[1], ratio1 * r[2], r[3]];
    let r2 = [r[0] + r1[2], r[1], ratio2 * r[2], r[3]];
    let r3 = [ r[0] + r1[2] + r2[2], r[1], ratio3 * r[2], r[3]];
    return combine_ocaml(elements, [r1, r2, r3]);
  } else {
    let r1 = [r[0], r[1], r[2], ratio1 * r[3]];
    let r2 = [r[0], r[1] + r1[3], r[2], ratio2 * r[3]];
    let r3 = [
      r[0],
      r[1] + r1[3] + r2[3],
      r[2],
      ratio3 * r[3]
    ];
    return combine_ocaml(elements, [r1, r2, r3]);
  }
}

// make a snake layout to fill the rectangle r with the 4 elements a, b, c and d
function make_snake4(s_a, s_b, s_c, s_d, r) {
  let sum = s_a + s_b + s_c + s_d;
  let rat1 = s_a / sum;
  let rat2 = s_b / sum;
  let rat3 = s_c / sum;
  let rat4 = s_d / sum;
  if (r >= 1) {
    let r1 = [r[0], r[1], rat1 * r[2], r[3]];
    let r2 = [r[0] + r1[2], r[1], rat2 * r[2], r[3]];
    let r3 = [
      r[0] + r1[2] + r2[2],
      r[1],
      rat3 * r[2],
      r[3],];
    let r4 = [
      r[0] + r1[2] + r2[2] + r3[2],
      r[1],
      rat4 * r[2],
      r[3],
    ];
    return [r1, r2, r3, r4];
  } else {
    let r1 = [r[0], r[1], r[2], rat1 * r[3]];
    let r2 = [r[0], r[1] + r1[3], r[2], rat2 * r[3]];
    let r3 = [
      r[0],
      r[1] + r1[3] + r2[3],
      r[2],
      rat3 * r[3],
    ];
    let r4 = [
      r[0],
      r[1] + r1[3] + r2[3] + r3[3],
      r[2],
      rat4 * r[3],
    ];
    return [r1, r2, r3, r4];
  }
}

//makes a quad layout to fill the rectangle r with elements a, b and c
function make_quad4(s_a, s_b, s_c, s_d, r) {
  let ratio1 = (s_a + s_b) / (s_a + s_b + s_c + s_d);
  let ratio2 = s_a / (s_a + s_b);
  let ratio3 = s_c / (s_c + s_d);

  let w = ratio1 * r[2];
  let h = ratio2 * r[3];
  let r1 = [r[0], r[1], w, h];
  let r2 = [r[0], r[1] + h, w, r[3] - h];
  h = ratio3 * r[3];
  let r3 = [r[0] + w, r[1], r[2] - w, h];
  let r4 = [r[0] + w, r[1] + h, r[2] - w, r[3] - h];
  return [r1, r2, r3, r4];
}

//if there are only 2 elements : put them in order in the rectangle.
//Either on top of each other, or side by side depending on the dimensions of r
function only_2_elements(l, r) {
  let elem1 = l[0];
  let elem2 = l[1];
  let ratio_new = elem1[1]/ (elem1[1] + elem2[1]);
  if (ratio(r) >= 1) {
    let w = ratio_new * r[2];
    let r1 = [r[0], r[1], w, r[3]];
    let r2 = [r[0] + w, r[1], r[2] - w, r[3]];
    return [
      [elem1[0], r1],
      [elem2[0], r2],
    ];
  } else {
    let h = ratio_new * r[2];
    let r1 = [r[0], r[1], r[2], h];
    let r2 = [r[0], r[1] + h, r[2], r[3] - h];
    return [
      [elem1[0], r1],
      [elem2[0], r2],
    ];
  }
}

function alternative_4(l, r) {
  let elema = l[0];
  let elemb = l[1];
  let elemc = l[2];
  let elemd = l[3];
  let elements = [elema[0], elemb[0], elemc[0], elemd[0]];
  let snake = combine_ocaml(elements, make_snake4(elema[1], elemb[1], elemc[1], elemd[1], r));
  let quad = combine_ocaml(elements, make_quad4(elema[1], elemb[1], elemc[1], elemd[1], r));
  let ratio_s = 1 + average_ratio(snake);
  let ratio_q = 1 + average_ratio(quad);
  if (ratio_s < ratio_q) {
    return snake;
  } else {
    return quad;
  }
}

function combine_ocaml(l, l2) {
  if (l.length != l2.length) {
    return;
  } else {
    let liste = [];
    for (let i = 0; i < l.length; i++) {
      liste.push([l[i], l2[i]]);
    }
    return liste;
  }
}

//fonction ok
function make_1(box1, l_size) {
  //if the aspect ratio of box1 is >= 1 *)
  let h = box1[3];
  let w = l_size / h;
  let r1 = [box1[0], box1[1], w, h];
  let box2 = [
    r1[0] + r1[2],
    r1[1],
    box1[2] - w,
    h,
  ];
  return [r1, box2];
}

//fonction ok
function make_0(box1, l_size) {
  //if the aspect ratio of box1 is < 1 *)
  let w = box1[2];
  let h = l_size / w;
  let r1 = [box1[0], box1[1], w, h];
  let box2 = [box1[0], box1[1] + h, w, box1[3] - h];
  return [r1, box2];
}

//fonction ok
function make_r1(box1, l_size) {
  if (ratio(box1) >= 1) {
    return make_1(box1, l_size);
  } else {
    return make_0(box1, l_size);
  }
}

function make_r2_rp(box2, pivot_area, l2_size) {
  let ratio1 = pivot_area / (pivot_area + l2_size);
  if (ratio(box2) >= 1) {
    let h = ratio1 * box2[3];
    let rp = [box2[0], box2[1], box2[2], h];
    let r2 = [box2[0], box2[1] + h, box2[2], box2[3] - h];
    return [rp, r2];
  } else {
    let w = ratio1 * box2[2];
    let rp = [box2[0], box2[1], w, box2[3]];
    let r2 = [box2[0] + w, box2[1], box2[2] - w, box2[3]];
    return [rp, r2];
  }
}

function filteri1(l, pivot_index, i) {
  let liste = [];
  if (l != []) {
    for (let j = pivot_index; j < i+1; j++) {
        liste.push(l[j]);
    }
  }
  return liste;
}

function filteri2(l, i) {
  let liste = [];
  for (let j = i; j < l.length; j++) {
      liste.push(l[j]);
  }
  return liste;
}

function filteri3(l, pivot_ind, bestInd) {
  let liste = [];
  for (let j = 0; j < l.length; j++) {
    if (j > pivot_ind && j <= bestInd) {
      liste.push(l[j]);
    }
  }
  return liste;
}

function filteri4(l, i) {
  let liste = [];
  for (let j = 0; j < i; j++) {
      liste.push(l[j]);
  }
  return liste;
}

//find the indexes at which to split the list *)
function find_indexes(first, bestAR, bestW, bestH, i, bestIndex, l_length, l, pivot_area, pivot_index, box2) {
  if (i == l_length) {
    return [bestAR, bestW, bestH, bestIndex];
  } else {
    let l2 = filteri1(l, (pivot_index+1), i);
    let l3 = filteri2(l, i+1);
    let l2_size = sum_areas(l2);
    let l3_size = sum_areas(l3);
    let ratio1 = (pivot_area + l2_size) / (pivot_area + l2_size + l3_size);
    let ratio2 = pivot_area / (pivot_area + l2_size);
    let w_h = [];
    if (ratio(box2) >= 1) {
      w_h = [ratio1 * box2[2], ratio2 * box2[3]];
    } else {
      w_h = [ratio2 * box2[2], ratio1 * box2[3]];
    }
    let pivotAR = w_h[0] / w_h[1];
    if (first) {
      return find_indexes(false, pivotAR, w_h[0], w_h[1], i + 1, i,l_length, l , pivot_area, pivot_index, box2);
    } else if (Math.abs(pivotAR - 1) < Math.abs(bestAR - 1)) {
      return find_indexes(false, pivotAR, w_h[0], w_h[1], i + 1, i, l_length, l , pivot_area, pivot_index, box2);
    } else {
      return find_indexes(false, bestAR, bestW, bestH, i + 1, bestIndex, l_length, l , pivot_area, pivot_index, box2);
    }
  }
}

function make_l2_l3(box2, l, pivot_index, pivot_area) {
  let l_length = l.length;
  let bAR_W_H_I = find_indexes(true, 0, 0, 0, (pivot_index), 0, l_length, l, pivot_area, pivot_index, box2);
  let l2 = filteri3(l, pivot_index,bAR_W_H_I[3]);
  let l3 = [];
  if (l_length - 1 - bAR_W_H_I[3] > 0) {
    l3 = filteri3(l, bAR_W_H_I[3], l_length);
  }
  return [l2, l3, bAR_W_H_I[1], bAR_W_H_I[2]];
}

function make_rp_r2_r3(box2, box1, l2, l3, bestW, bestH) {
  let rp = [box2[0], box2[1], bestW, bestH];
  if (ratio(box2) >= 1) {
    let r2 = [box2[0] , box2[1] + rp[3], rp[2], box2[3] - rp[3]];
    let r3 = [];
    if (l3.length >= 1) {
      r3 = [box2[0] + rp[2], box2[1], box2[2] - rp[2], box2[3]];
    }
    return [rp, r2, r3];
  } else {
    let r2 = [box2[0] + rp[2], box2[1], box2[2] - rp[2], rp[3]];
    let r3 = [];
    if (l3.length >= 1) {
      r3 = [box2[0], box2[1] + rp[3], box2[2], box2[3] - rp[3]];
    }
    return [rp, r2, r3];
  }
}

// returns rp, r2, r3. r2 and r3 can be None *)
function compute_rp_r2_r3(l, box1, box2, pivot_index, pivot_area) {
  let d = l.length - pivot_index - 1;
  if (d > 2) {
    //(* make l2 and l3 *)

    let l2_l3_W_H = make_l2_l3(box2, l, pivot_index, pivot_area);
    let rp_r2_r3 = make_rp_r2_r3(
      box2,
      box1,
      l2_l3_W_H[0],
      l2_l3_W_H[1],
      l2_l3_W_H[2],
      l2_l3_W_H[3]
    );
    return [
      rp_r2_r3[0],
      rp_r2_r3[1],
      rp_r2_r3[2],
      l2_l3_W_H[0],
      l2_l3_W_H[1]
    ];
  } else if (d > 0) {
    //(* l3 is null *)
    let l2 = take_last_n_elem( (pivot_index+1), l);
    let l2_size = sum_areas(l2);
    let rp_r2 = make_r2_rp(box2, pivot_area, l2_size);
    return [rp_r2[0], rp_r2[1], [], l2, []];
  } else {
    return [box2, [], [], [], []]; //l2 AND l3 are null *)
  }
}

function tiling_algo(l, box1) {
  //(* base cases *)
  let length = l.length;
  if (length == 0) {
    return [];
  } else if (length == 1) {
    let el_area = l[0];
    return [ [el_area[0], box1] ];
  } else if (length == 2) {
    return only_2_elements(l, box1); //(* both rect side by side *)
  } else if (length == 3) {
    return make_snake3(l, box1); // (* snake layout *)
  } else if (length == 4) {
    return alternative_4(l, box1); // (* snake or quad layout *)
    //(* general case *)
  } else {
    //(* launch recursion *)
    let el_ar_ind = find_pivot(l);
    //(* make the list of all the elements before the pivot *)
    let l1 = filteri4(l, el_ar_ind[2]);
    //print("L1 : "+l1);
    let l1_size = sum_areas(l1);
    //(* compute the space for l1 and the space left for the rest *)
    let r1_box2 = make_r1(box1, l1_size);
    let rp_r2_r3_l2_l3 = compute_rp_r2_r3(
      l,
      box1,
      r1_box2[1],
      el_ar_ind[2],
      el_ar_ind[1]
    );
    //print("L2 : "+rp_r2_r3_l2_l3[3]);
    //print("L3 : "+rp_r2_r3_l2_l3[4]);
    //(* recursion on l1, l2 and l3 if they are not empty *)
    ret = [];
    if (l1.length >= 1){
      let l1_rec = tiling_algo(l1, r1_box2[0]);
      ret = add(ret,l1_rec);
    }
    let l2_rec = [];
    if (rp_r2_r3_l2_l3[3].length != [] ) {
      l2_rec = tiling_algo(rp_r2_r3_l2_l3[3], rp_r2_r3_l2_l3[1]);
      ret = add(ret,l2_rec);
    }
    let l3_rec = [];
    if (rp_r2_r3_l2_l3[4].length != []) {
      l3_rec = tiling_algo(rp_r2_r3_l2_l3[4], rp_r2_r3_l2_l3[2]);
      ret = add(ret,l3_rec);
    }
    let tab = [ [el_ar_ind[0], rp_r2_r3_l2_l3[0] ]  ];
    let fin = add(ret, tab );
    return fin;
  }
}

function getColor(n, liste){
  for (let i = 0; i<liste.length;i++){
    if (liste[i][0] == n){
      return liste[i][1];
    }
  }
}

function print_all(l) {

  let colors = [ ["a", color(233, 30, 99)],
                ["b", color(255, 111, 0)],
                ["c", color(241, 39, 34)],
                ["d", color(255, 235, 59)],
                ["e", color(48, 63, 159)],
                ["f", color(189, 189, 189)],
                ["g", color(41, 182, 246)],
                ["h", color(156, 204, 101)],
                ["i", color(186, 104, 200)] ];
  if (l.length >= 1) {
    for (let i = 0; i < l.length; i++) {
      let el_r = l[i];
      let r = el_r[1];
      let c = getColor(el_r[0], colors);
      fill(c);
      noStroke();
      rect(r[0], r[1], r[2], r[3]);
    }
  }
}

function to_int (l) {
  if (l == []){
    return [];
  } else {
    let liste = [];
    for (let i = 0; i < l.length; i++) {
      let el_r = l[i];
      let r = el_r[1];
      let r2 = [ (r[0]*50) , (r[1]*50) , (r[2]*50) , (r[3]*50) ] ;
      liste.push( [ el_r[0], r2 ]);
    }
    return liste;
  }
}

function update_liste(l){
  let liste = [];
  for (let i = 0; i < l.length; i++){
    if (l[i][1] != 0){
      liste.push(l[i]);
    }
  }
  return liste;
}


function print_result(ll) {
  let l = update_liste(ll);
  if (l.length >= 1){
    let l_size = sum_areas(l);
    let side = sqrt(l_size);
    let box = [0, 0, side, side];
    let rep = tiling_algo(l, box);
    print_all(to_int(tiling_algo(l, box)));
  }
}
