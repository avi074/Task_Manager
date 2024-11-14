import {createSlice} from "@reduxjs/toolkit"

const taskSlice = createSlice({
    name:'tasks',
    initialState:{
        varName: "local-tasks",
        allTasks: null,
        filteredTasks: null,
    },
    reducers:{

    }
})

export default taskSlice.reducer;
