# ✝ 성경으로 세상읽기 (Reading the world through the Bible)

돈·시간·고난·일·관계 등 매일의 세상을 **성경의 관점으로 다시 읽어내는** 정적(static) 콘텐츠 사이트입니다.
빌드 과정이 없는 순수 HTML/CSS/JS로 만들어졌습니다.

## 📄 페이지 구성

| 파일 | 내용 |
|------|------|
| `index.html` | 홈 — 소개, 오늘의 말씀, 최신 칼럼 |
| `columns.html` | 칼럼 목록 |
| `col-money.html` | 돈, 주인인가 도구인가 |
| `col-time.html` | 시간, 관리인가 선물인가 |
| `col-suffering.html` | 고난, 벌인가 통로인가 |
| `col-work.html` | 일, 생계인가 소명인가 |
| `col-relationship.html` | 이웃, 조건인가 얼굴인가 |
| `about.html` | 소개 |
| `contact.html` | 연락 (메일 연동) |

## 🗂 폴더 구조

```
.
├── index.html
├── columns.html
├── col-*.html          # 칼럼 글
├── about.html
├── contact.html
├── css/style.css       # 공통 디자인 시스템
├── js/main.js          # 네비·오늘의 말씀·읽기 진행바
└── .nojekyll           # 정적 파일 원본 그대로 서빙
```

## 🚀 실행 방법

```bash
# 로컬 서버 (권장 — JS 정상 동작)
python3 -m http.server 8000
# → http://localhost:8000
```

## 🌐 배포 (GitHub Pages)

1. GitHub 저장소 → **Settings → Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `root` 선택 후 저장
4. 잠시 후 `https://<사용자명>.github.io/bible-worldview/` 로 공개됩니다.

> 이 저장소는 입시 사이트(daeip24)와 완전히 분리된 독립 프로젝트입니다.
