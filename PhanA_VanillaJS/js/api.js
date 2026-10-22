const API_URL = 'https://660d1bd96ddfa2943b33731c.mockapi.io/api/v1/books';
const LOCAL_URL = './books.json';

export async function getBooks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error');
    return await res.json();
  } catch (err) {
    const localRes = await fetch(LOCAL_URL);
    if (!localRes.ok) throw new Error('Không thể tải danh sách sách');
    return await localRes.json();
  }
}

export async function addBookApi(bookPayload) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookPayload)
    });
    if (!res.ok) throw new Error('Error');
    return await res.json();
  } catch (err) {
    return { id: String(Date.now()), ...bookPayload };
  }
}

export async function deleteBookApi(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    return true;
  }
}
