### 1. Request Memoization

---

- 하나의 요청에서 동일한 URL로 fetch를 여러 번 호출해도, 네트워크 요청은 한 번만 보내고, 동일한 응답을 재사용하는 기능
  - 메모이제이션된 결과를 재사용하는 최적화 기능

```tsx
// /app/page.tsx (server component)

async function getData() {
  const res = await fetch("https://api.example.com/data", {
    cache: "force-cache", // or "no-store", "reload"
  });
  return res.json();
}

export default async function Page() {
  const data1 = await getData();
  const data2 = await getData(); // 동일한 요청 URL

  // ✅ fetch는 실제로 1번만 호출되고, data1 === data2
  return (
    <>
      <pre>{JSON.stringify(data1)}</pre>
      <pre>{JSON.stringify(data2)}</pre>
    </>
  );
}
```

- 위 코드에서 getData()는 두 번 호출되지만 실제로 fetch는 한 번만 실행됨
- Next.js가 URL + fetch 옵션을 기준으로 메모이제이션 키를 생성해 응답을 재사용함
- **하나의 페이지를 렌더링하는 동안에 중복된 API 요청을 캐싱하기 위해 존재함. 렌더링이 종료되면 모든 캐시가 소멸됨**
- `주의할 점`
  - **데이터 캐시와 혼동하면 안됨**
    - 데이터 캐시는 백엔드 서버로부터 불러온 데이터를 거의 영구적으로 보관하기 위해 사용됨
    - 서버 가동중에는 영구적으로 보관됨
