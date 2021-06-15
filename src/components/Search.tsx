import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../store/actions/alert.actions';
import { getWeather, setLoading } from '../store/actions/weather.actions';

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    setCity(event.currentTarget.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (city.trim() === '') {
      return dispatch(setAlert('City is required!'));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity('');
  };

  return (
    <div className="hero is-light has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <form className="py-5" onSubmit={submitHandler}>
            <input
              type="text"
              className="input has-text-centered mb-2"
              placeholder="Enter city name"
              style={{ maxWidth: 300 }}
              value={city}
              onChange={changeHandler}
            />
            <button
              type="submit"
              className="button is-primary is-fullwidth"
              style={{ maxWidth: 300, margin: '0 auto' }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
