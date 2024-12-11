import apiService from '../services/api.service';
import { useEffect } from 'react';

export default function Movies() {
  // const _baseImgUrl = 'https://image.tmdb.org/t/p/w780';
  // const apiKey = 'apiKey = '1b501bbda107113acc653f328a2e935d';

  useEffect(() => {
    const apiKey = '1b501bbda107113acc653f328a2e935d';
    const language = 'en';
    apiService
      .getMovies({
        language,
        apiKey,
      })
      .then((response) => {
        console.log('Response', response);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Popularity</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Value 1</td>
            <td>Value 2</td>
            <td>Value 3</td>
            <td>Value 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
