import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';


const CharSearchForm = () => {

    const [char, setChar] = useState(null);
    const {clearError, getCharacterByName, process, setProcess} =  useMarvelService();

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(data => setChar(data))
            .then(() => setProcess('confirmed'))
    }

    const errorMessage = process === "error" ? <div className='char__search-critical-error'><ErrorMessage/></div> : null;
    const result = !char ? null : char.length > 0 ? 
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
                </div> :
                <div className="char__search-error">
                     The character was not found. Check the name and try again
                </div>

    
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{ charName: ''}}
                validationSchema={Yup.object({
                charName: Yup.string().required('Required'),
                })}
                onSubmit={({charName}) => updateChar(charName)}
             >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === 'loading'}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                </Form>
                </Formik>
                {result}
                {errorMessage}
        </div>
    )
}

export default CharSearchForm;