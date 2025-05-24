import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async(category, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${category}`);
            if (!res.ok) {
                const error = await res.json();
                return thunkAPI.rejectWithValue(error);
            }
            return await res.json();
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: 'Errore durante il caricamento dei prodotti' });
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(p => p.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed';

            });
    },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;