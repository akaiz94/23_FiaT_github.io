
const gauge = {

    init :function(){
        this.jsonData=[];
        this.sort = 'desc';
        this.wrapper = document.querySelector('.gauge-box');
        this.wrapperList = this.wrapper.querySelector('.gauge-list');
        this.model = this.wrapperList.querySelector('.gauge-item').cloneNode(true);
        this.wrapperList.querySelector('.gauge-item').remove();
    },
    render : function(){

        if(!this.wrapper || !this.wrapperList)return false;
        this.wrapperList.innerHTML='';
        this.dataSort(this.jsonData).forEach((item)=>{
            this.setGauge(this.applyData(item),item.gauge);
        })
    }
    ,setData : function(data){
        this.jsonData=data;
    },
    setGauge : function(item,value){
        setTimeout(()=>{
            item.querySelector('.gauge-bar-value').style.width=value+'%';
        },100)
    },
    applyData : function(data){
        if(!data)return false;
        const model = this.model.cloneNode(true);
        model.querySelector('.gauge-name').innerText = data.name;
        model.querySelector('.gauge-rank').innerText = data.rank;
        model.querySelector('.gauge-rank').classList.add(this.setLevel(data.level));
        return this.wrapperList.appendChild(model);
    },
    setLevel : function(level){
        switch (level){
            case 1:
                return 'rank1';
            case 2:
                return 'rank2';
            case 3:
                return 'rank3';
            default:
                return '';
        }
    },
    dataSort : function(jsonData){
        const sort = this.sort;
        jsonData.sort(function compare(a, b) {
            return (sort==='desc'?a.gauge - b.gauge:b.gauge - a.gauge);
        });

        return jsonData;

    }
    ,
    setSort : function(sort){
        this.sort = sort;
    }


}

export {gauge};
