

import {createStore} from 'redux'

import { count as reducer } from './reducer'

export default createStore(reducer)