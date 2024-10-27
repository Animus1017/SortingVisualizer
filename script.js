document.addEventListener('DOMContentLoaded',()=>{
    // variables
    const size=document.querySelector('#size');
    const speed=document.querySelector('#speed');
    const generate=document.querySelector('#generate');
    const sortButtons=document.querySelectorAll('.sort-buttons');
    const arrContainer=document.querySelector('#array-container');
    const sizeVal=document.querySelector('#size-val');
    const speedVal=document.querySelector('#speed-val');
    let divSizes=[];
    let div=[];
    let arrSize=parseInt(size.value);
    let sp=1000;
    let cumDelay=0;
    let delay=10000/(Math.floor(arrSize/10)*sp);
    let speedlen=4;
    const worst=document.querySelector('#worst');
    const avg=document.querySelector('#avg');
    const best=document.querySelector('#best');
    const space=document.querySelector('#space');
    
    

    // functions
    function generateArray(){
        cumDelay=0;
        arrContainer.innerHTML="";
        worst.innerText='';
        avg.innerText='';
        best.innerText='';
        space.innerText='';
        for(let i=0;i<arrSize;i++){
            divSizes[i]=Math.floor(Math.random()*(size.max-size.min))+parseInt(size.min);
            //Math.floor(((Math.random()*(size.max-size.min))+size.min)/2)
            div[i]=document.createElement('div');
            arrContainer.appendChild(div[i]);
            div[i].style.cssText = `width: ${100 / arrSize}%; height: ${(divSizes[i]/size.max)*100}%; `;
        }
    }
    function updateArray(){
        arrSize=parseInt(size.value);
        generateArray();
    }
    function disableBtns(){
        sortButtons.forEach((btn)=>{
            btn.style.cursor='not-allowed';
            btn.disabled=true;
        });
        size.disabled=true;
        size.style.cursor='not-allowed';
        speed.disabled=true;
        speed.style.cursor='not-allowed';
        generate.disabled=true;
        generate.style.cursor='not-allowed';
    }
    function sortCall(index){
        sortButtons[index].classList.add('active');
        cumDelay=0;
        disableBtns();
        switch(index){
            case 0: bubble();
                    break;
            case 1: selection();
                    break;
            case 2: insertion();
                    break;
            case 3: mergesort();
                    break;
            case 4: quick();            
                    break;
            case 5: heap();            
                    break;
        }
    }





    // visualization
    function updateSpeed(){
        let arrSpeed=parseInt(speed.value);
        switch(arrSpeed){
            case 1:
                sp=50;
                break;
            case 2:
                sp=100;
                break;
            case 3:
                sp=500;
                break;
            case 4:
                sp=1000;
                break;
            case 5:
                sp=5000;
                break;
        }
        delay=10000/(Math.floor(arrSize/10)*sp);
    }
    function updateDiv(div,height,color){
        setTimeout(()=>{
            div.style.cssText=`width: ${100 / arrSize}%; height: ${(height/size.max)*100}%; background-color: ${color};`;
        },cumDelay+=delay);
    }
    function enableBtns(){
        setTimeout(()=>{
            sortButtons.forEach((btn)=>{
                btn.classList.remove('active');
                btn.disabled=false;
                btn.style.cursor='pointer';
            });
            size.disabled=false;
            size.style.cursor='pointer';
            speed.disabled=false;
            speed.style.cursor='pointer';
            generate.disabled=false;
            generate.style.cursor='pointer';
        },cumDelay+=delay);
    }






    // sorting algos
    function bubble(){
        worst.innerText='O(n²)';
        avg.innerText='O(n²)';
        best.innerText='O(n)';
        space.innerText='O(1)';
        cumDelay=0;
        for(let i=0;i<arrSize-1;i++){
            let j;
            for(j=0;j<arrSize-i-1;j++){
                updateDiv(div[j],divSizes[j],"#F8E6A0");
                if(divSizes[j]>divSizes[j+1]){
                    updateDiv(div[j],divSizes[j],"#F15B50");
                    updateDiv(div[j+1],divSizes[j+1],"#F15B50");
                    [divSizes[j],divSizes[j+1]]=[divSizes[j+1],divSizes[j]];
                    updateDiv(div[j],divSizes[j],"#F15B50");
                    updateDiv(div[j+1],divSizes[j+1],"#F15B50");
                }
                updateDiv(div[j],divSizes[j],"#B8ACF6");
            }
            updateDiv(div[j],divSizes[j],"#7EE2B8");
        }
        updateDiv(div[0],divSizes[0],"#7EE2B8");
        enableBtns();
    }

    function minIndex(index){
        let mini=index;
        for(let i=index+1;i<arrSize;i++){
            updateDiv(div[i],divSizes[i],"#F8E6A0");
            if(divSizes[mini]>divSizes[i]){
                if(mini!=index)
                    updateDiv(div[mini],divSizes[mini],"#B8ACF6");
                mini=i;
                updateDiv(div[mini],divSizes[mini],"#F15B50");
            }
            else
            updateDiv(div[i],divSizes[i],"#B8ACF6");
        }
        return mini;
    }
    function selection(){
        worst.innerText='O(n²)';
        avg.innerText='O(n²)';
        best.innerText='O(n²)';
        space.innerText='O(1)';
        cumDelay=0;
        for(let i=0;i<arrSize-1;i++){
            updateDiv(div[i],divSizes[i],"#F15B50");
            let m=minIndex(i);
            if(m!=i){
                [divSizes[i],divSizes[m]]=[divSizes[m],divSizes[i]];
                updateDiv(div[m],divSizes[m],"#F15B50");
                updateDiv(div[i],divSizes[i],"#F15B50");
                updateDiv(div[m],divSizes[m],"#B8ACF6");
            }
            updateDiv(div[i],divSizes[i],"#7EE2B8");
        }
        updateDiv(div[arrSize-1],divSizes[arrSize-1],"#7EE2B8");
        enableBtns();
    }

    function insertion(){
        worst.innerText='O(n²)';
        avg.innerText='O(n²)';
        best.innerText='O(n)';
        space.innerText='O(1)';
        cumDelay=0;
        for(let i=1;i<arrSize;i++){
            updateDiv(div[i],divSizes[i],"#F8E6A0");
            for(let j=i;j-1>=0 && divSizes[j-1]>divSizes[j];j--){
                updateDiv(div[j],divSizes[j],"#F15B50");
                updateDiv(div[j-1],divSizes[j-1],"#F15B50");
                [divSizes[j],divSizes[j-1]]=[divSizes[j-1],divSizes[j]];
                updateDiv(div[j],divSizes[j],"#B8ACF6");
                updateDiv(div[j-1],divSizes[j-1],"#B8ACF6");
            }
            for(let k=0;k<=i;k++)
            updateDiv(div[k],divSizes[k],"#7EE2B8");
        }
        enableBtns();        
    }

    function merge(s,e){
        let mid=Math.floor((s+e)/2);
        let n1=mid-s+1;
        let n2=e-mid;
        let a=[];
        let b=[];
        for(let i=0,k=s;k<=mid;i++,k++){
            a[i]=divSizes[k];
            updateDiv(div[k], divSizes[k], "#F8E6A0");
        }
        for(let i=0,k=mid+1;k<=e;i++,k++){
            b[i]=divSizes[k];
            updateDiv(div[k], divSizes[k], "#F8E6A0");
        }
        let l=0;
        let r=0;
        let m=s;
        while(l<n1 && r<n2){
            if(a[l]<b[r])
            divSizes[m++]=a[l++];
            else
            divSizes[m++]=b[r++];
            updateDiv(div[m - 1], divSizes[m - 1], "#F15B50");
        }
        while(l<n1){
            divSizes[m++]=a[l++]; 
            updateDiv(div[m - 1], divSizes[m - 1], "#F15B50");
        }
        while(r<n2){
            divSizes[m++]=b[r++]; 
            updateDiv(div[m - 1], divSizes[m - 1], "#F15B50");
        }      
        for (let k = s; k <= e; k++) {
            updateDiv(div[k], divSizes[k], "#7EE2B8");
        }
    }
    function msort(s,e){
        if(s<e){
            let mid=Math.floor((s+e)/2);
            msort(s,mid);
            msort(mid+1,e);
            merge(s,e);
        }
    }
    function mergesort(){
        worst.innerText='O(nlogn)';
        avg.innerText='O(nlogn)';
        best.innerText='O(nlogn)';
        space.innerText='O(n)';
        cumDelay=0;
        msort(0,arrSize-1);
        enableBtns();
    }
    


    function quicksort(s,e){
        if(s<e){
            let i=s-1;
            let j=s;
            updateDiv(div[e], divSizes[e], "#F8E6A0");
            while(j<e){
                updateDiv(div[j], divSizes[j], "#F8E6A0"); 
                if(divSizes[j]<divSizes[e]){
                    i++;
                    updateDiv(div[i], divSizes[i], "#F15B50"); 
                    updateDiv(div[j], divSizes[j], "#F15B50");
                    [divSizes[i],divSizes[j]]=[divSizes[j],divSizes[i]];
                    updateDiv(div[i], divSizes[i], "#F15B50"); 
                    updateDiv(div[j], divSizes[j], "#F15B50");
                    updateDiv(div[i], divSizes[i], "#B8ACF6"); 
                    updateDiv(div[j], divSizes[j], "#B8ACF6"); 
                }
                else 
                updateDiv(div[j], divSizes[j], "#B8ACF6");
                j++;
            }
            i++;
            updateDiv(div[e], divSizes[e], "#F15B50"); 
            updateDiv(div[i], divSizes[i], "#F15B50");
            [divSizes[i],divSizes[e]]=[divSizes[e],divSizes[i]];
            updateDiv(div[e], divSizes[e], "#B8ACF6"); 
            updateDiv(div[i], divSizes[i], "#7EE2B8");
            quicksort(s,i-1);
            quicksort(i+1,e);
        }
        else if(s===e)
        updateDiv(div[s], divSizes[s], "#7EE2B8");
    }
    function quick(){
        worst.innerText='O(n²)';
        avg.innerText='O(nlogn)';
        best.innerText='O(nlogn)';
        space.innerText='O(logn) or O(n)';
        cumDelay=0;
        quicksort(0,arrSize-1);
        enableBtns();
    }
    
    

    function heapify(n,i){
        let maxi=i,left=2*i+1,right=2*i+2;
        updateDiv(div[i], divSizes[i], "#F8E6A0");
        if(left<n && divSizes[left]>divSizes[maxi]){
            if(maxi!=i)
                updateDiv(div[maxi], divSizes[maxi], "#B8ACF6");
            maxi=left;
            updateDiv(div[maxi], divSizes[maxi], "#F15B50");
        }
        if(right<n && divSizes[right]>divSizes[maxi]){
            if(maxi!=i)
                updateDiv(div[maxi], divSizes[maxi], "#B8ACF6");
            maxi=right;
            updateDiv(div[maxi], divSizes[maxi], "#F15B50");
        }
        if(maxi!=i){
            updateDiv(div[maxi], divSizes[maxi], "#F15B50");
            updateDiv(div[i], divSizes[i], "#F15B50");
            [divSizes[maxi],divSizes[i]]=[divSizes[i],divSizes[maxi]];
            updateDiv(div[maxi], divSizes[maxi], "#F15B50");
            updateDiv(div[i], divSizes[i], "#F15B50");
            updateDiv(div[maxi], divSizes[maxi], "#B8ACF6");
            updateDiv(div[i], divSizes[i], "#B8ACF6");
            heapify(n,maxi);
        }
        else {
            updateDiv(div[i], divSizes[i], "#B8ACF6");
        }
    }
    function buildHeap(){
        for(let i=arrSize/2-1;i>=0;i--)
            heapify(arrSize,i);
    }
    function heap(){worst.innerText='O(nlogn)';
        avg.innerText='O(nlogn)';
        best.innerText='O(nlogn)';
        space.innerText='O(1)';
        cumDelay=0;
        buildHeap();      
        for(let i=arrSize-1;i>0;i--){
            updateDiv(div[0], divSizes[0], "#F15B50");
            updateDiv(div[i], divSizes[i], "#F15B50");
            [divSizes[i],divSizes[0]]=[divSizes[0],divSizes[i]];
            updateDiv(div[0], divSizes[0], "#B8ACF6");
            updateDiv(div[i], divSizes[i], "#7EE2B8");
            heapify(i,0);
        }
        updateDiv(div[0], divSizes[0], "#7EE2B8");
        enableBtns();
    }


    function handleSize(){
        size.value=arrSize;
        sizeVal.innerText=arrSize;
        size.style.backgroundSize=`${((arrSize-size.min)*100/(size.max-size.min))}% 100%`;
    }
    function handleSpeed(){
        speed.value=speedlen;
        speedVal.innerText=speedlen;        
        speed.style.backgroundSize=`${((speedlen-speed.min)*100/(speed.max-speed.min))}% 100%`;
    }




    // event listeners
    generate.addEventListener('click',generateArray);
    size.addEventListener('input',(e)=>{
        arrSize=parseInt(e.target.value);
        updateArray();
        handleSize();
    });
    sortButtons.forEach((btn,index)=>{
        btn.addEventListener('click',()=>{
            sortCall(index);
        });
    });
    speed.addEventListener('input',(e)=>{
        speedlen=parseInt(e.target.value);
        updateSpeed();
        handleSpeed();
    });
    updateArray();
    handleSize();
    handleSpeed();


    




});