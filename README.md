# Tạo Slogan & Quảng Bá Thương Hiệu

Một ứng dụng web sáng tạo và thông minh, tạo ra các khẩu hiệu và nội dung quảng bá độc đáo cho doanh nghiệp và các công ty khởi nghiệp bằng công nghệ trí tuệ nhân tạo.

## Tính năng

- **Tạo ra ý tưởng bằng AI**: Sử dụng API Google Gemini để tạo ra các khẩu hiệu và tên thương hiệu sáng tạo
- **Dễ sử dụng**: Giao diện đơn giản, trực quan dành cho các doanh nhân và chuyên gia kinh doanh
- **Sao chép vào clipboard**: Nhanh chóng sao chép bất kỳ khẩu hiệu hoặc tên thương hiệu nào vào clipboard
- **Xử lý lỗi**: Thông báo lỗi rõ ràng, thân thiện với người dùng để mang lại trải nghiệm tốt hơn

##  Bắt đầu nhanh

### Chuẩn bị

- Node.js 
- Google Gemini API Key 
- Docker Desktop 

### Hướng dẫn

1. **Clone the repository**
   ```bash
   git clone https://github.com/dothingocly08-tech/Brand-slogan-generator.git
   cd brand-slogan-generator
   ```

2. **Run locally**
   - Option A: Using Python
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```
   - Option B: Using Node.js
   ```bash
   npm install
   npm run dev
   # Visit http://localhost:8000
   ```

##  Cấu trúc dự án

```
brand-slogan-generator/
├── index.html              # Main HTML file with structure and form
├── styles.css              # Styling and responsive design
├── app.js                  # JavaScript logic and AI integration
├── package.json            # Project metadata
├── Dockerfile              # Docker containerization
├── docker-compose.yml      # Docker Compose configuration
├── .gitignore              # Git ignore rules
└── README.md              # This file
```

##  Cách sử dụng

1. **Nhập thông tin**
   - **Tên công ty**: Nhập tên công ty
   - **Lĩnh vực/Ngành**: Chọn lĩnh vực
   - **Phong cách thương hiệu**: chọn phong cách
   - **Ngôn ngữ**: chọn ngôn ngữ của kết quả
2. **Tạo kết quả**
   - chọn TẠO THƯƠNG HIỆU	
   - Chờ AI xử lý 5-10 giây


## Docker

### Hướng dẫn

```bash
# Build the Docker image
docker build -t brand-slogan-generator .

# Run the container
docker run -p 8000:8000 brand-slogan-generator

# Open http://localhost:8000
```

### Docker Compose (Recommended)

```bash
docker-compose up
```

Thao tác này sẽ khởi chạy ứng dụng trên cổng 8000.

##  Triển khai trên Vercel

### Truy cập link: https://brand-slogan-generator.vercel.app/


## Cảnh báo bảo mật

**Quan trọng**
- Cách triển khai hiện tại : lưu trữ khóa API trực tiếp trong mã nguồn, chỉ nhằm mục đích giáo dục
- Không được dùng phương pháp này trong môi trường production


**Last Updated**: March 2026  
**Version**: 1.0.0
