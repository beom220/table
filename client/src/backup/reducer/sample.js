const counterSlice = createSlice({
    name : "counter",
    initialState : 0,
    reducers : {
        increment : state => state + 1,
        decrement : state => state - 1
    }
})

const store = configureStore({
    reducer : counterSlice.reducer,
})

document.getElementById('increment').addEventListener("click", () => {
    store.dispatch(counterSlice.actions.increment())
})