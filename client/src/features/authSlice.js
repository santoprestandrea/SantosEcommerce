// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({ email, password }, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                return thunkAPI.rejectWithValue(error);
            }

            return await res.json();
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: 'Errore di rete' });
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async({ email, password, role }, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            if (!res.ok) {
                const error = await res.json();
                return thunkAPI.rejectWithValue(error);
            }

            return await res.json();
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: 'Errore di rete' });
        }
    }
);

const initialState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutInternal: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.error;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.error;
            });
    },
});

export const logout = () => (dispatch) => {
    dispatch(logoutInternal());
    dispatch(clearCart());
};

export const { logoutInternal } = authSlice.actions;
export default authSlice.reducer;