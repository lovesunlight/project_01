$(function(){
    todoList()
    $('#title').on('keydown', function(e){
        if(e.keyCode === 13){
            if($(this).val() === ''){
                alert('请输入想要办理的事项')
            }else{
                var inputData = $(this).val()
                var localData = getLocalData()
                localData.push({'title':inputData, done : false})
                setLocalData(localData)
                todoList()
                $(this).val('')
            }
        }
    })
    //获取本地存储
    function getLocalData(GetData){
        var localData = localStorage.getItem('todolist')
        if(localData != null){
            return JSON.parse(localData)
        }else{
            return []
        }
    }

    //将数据存入本地存储
    function setLocalData(SetData){
        localStorage.setItem('todolist', JSON.stringify(SetData))
    }

    //渲染正在进行模块
    function todoList(){
        $('#todolist').empty()
        $('#donelist').empty()
        var data = getLocalData()

        var todoCount = 0//正在进行的个数
        var doneCount = 0//已经完成的个数
        $.each(data, function(i, ele){
            if (ele.done) {
                $('#donelist').prepend(`<li><input type="checkbox" checked><p>${ele.title}</p><a href="javascript:;" id="${i}">❌</a></li>`)
                todoCount++
            }else{
                $('#todolist').prepend(`<li><input type="checkbox"><p>${ele.title}</p><a href="javascript:;" id="${i}">❌</a></li>`)
                doneCount++
            }
        })
        $('#todocount').text(todoCount)
        $('#todocount').text(doneCount)
    }

    //点击叉号删除元素
    $('ol, ul').on('click','a', function(){
        var data = getLocalData()
        var index = $(this).attr('id')

        //将对应的本地数据删除
        data.splice(index, 1)

        setLocalData(data)

        todoList()
    })
    
    $('ol, ul').on('click', 'input', function(){
        var data = getLocalData()

        var iptIndex = $(this).siblings('a').attr('id')
        data[iptIndex].done = $(this).prop('checked')

        setLocalData(data)
        todoList()
    })
})