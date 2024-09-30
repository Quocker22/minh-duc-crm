# web-app-Minh Đức CRM

## Project setup and run

### Cách 1

#### Môi truờng development

```
- Đảm bảo rằng luôn có file .env.development ở thư mục gốc của project
- Chỉ cần chạy yarn && yarn dev và truy cập vào http://localhost:8100/
```

#### Môi truờng production

```
- Đảm bảo rằng luôn có file .env.staging ở thư mục gốc của project
- Trong file .env.staging chứa các biến Môi trường để chạy APP. Khi thay đổi API domain hãy thay đổi giá trị của VITE_BASE_API_URL trong file này
- Sau đó chạy lệnh: yarn && yarn build:staging để ứng dụng được build
- Sau khi built hãy chạy: yarn serve --port 3030 sau đó truy cập vào đường dẫn http://localhost:3030/
- Hoặc có thể chạy thông qua nginx(hoặc các web server tường tự) hãy truy cập vào dist/index.html để chạy (không cần thực hiện bước thứ 4)
```

## Cách 2

#### Môi truờng development

```
- Đảm bảo rằng luôn có file .env.development ở thư mục gốc của project
- Chỉ cần chạy docker-compose -f docker-compose.dev.yml up -d --build và truy cập vào http://localhost:3030/
```

#### Môi truờng production

```
- Đảm bảo rằng luôn có file .env.staging ở thư mục gốc của project
- Sau đó chạy lệnh: docker build -t web-app . --build-arg MODE=staging
- Sau đó chạy lệnh: docker-compose up -d
- Truy cập vào http://localhost:80/
```

<hr/>

## Project features

### Dashboard

```
- Hiển thị các thống kế về đơn hàng, tài xế và doanh thu.
```

### Quản lý nhân viên

```
- Thêm, xoá và sửa thông tin nhân viên
```

### Quản lý tài xế

```
- Thêm, xoá và sửa thông tin tài xế
- Định vị các tài xế online
```

### Quản lý khách hàng

```
- Thêm, xoá và sửa thông tin khách hàng
```

### Quản lý dịch vụ

```
- Thêm, xoá và sửa thông tin dịch vụ
```

### Quản lý đơn hàng

```
- Thêm, xoá và sửa thông tin đơn hàng
```

### Quản lý khuyến mãi

```
- Thêm, xoá và sửa thông tin khuyến mãi
```

### Quản lý thông báo

```
- Thêm, xoá và sửa thông tin thông báo
- Lịch sử thông báo
```

### Quản lý thống kê cài đặt

### Thiết lập hệ thống

```
- Địa phương hoạt động
- Force updated
```

<hr/>

## Project structure

### cypress

```
- Các file code dùng đê test e2e.
- Các file code sẽ được đặt trong thư mục cypress/e2e.
- Các thư mục còn lại trong cypress sẽ tự động sinh ra khi chạy test.
- Để chạy test dùng lệnh: yarn cy:run
```

### docs

```
- Các file tài liệu
```

### public

```
- Các resource dùng để hiển thị như ảnh, icon, video, ...
```

### src

```
- Toàn bộ code của dự án
```

#### \_metronic

```
- Mã code của theme metronic
```

#### api

```
- Nơi khởi tạo HTTP client (axios) và một số global api dùng chung như auth, place, upload
```

#### assets

```
- Các styles của trang web
```

#### common

```
- Logic dùng trên toàn bộ APP (hiện tại chỉ có sử lý lỗi khi call API)
```

#### components

```
- Toàn bộ các components dùng chung của APP
```

#### constants

```
- Toàn bộ các constants dùng chung của APP
```

#### hooks

```
- Toàn bộ các hooks dùng chung của APP
```

#### mocks

```
- Các dữ liệu mẫu dùng khi test APP
```

#### models

```
- Toàn bộ các models dùng chung của APP
```

#### router

```
- Định nghĩa các routes của APP
- Mỗi route thể hiện một chức năng (/auth là dùng để đăng nhập)
```

#### store

```
- Các state management của APP
- Hiện tại chỉ lưu thông tin đăng nhập
```

#### utils

```
- Toàn bộ các hàm dùng chung của APP
```

#### modules

```
- Từng tính năng sẽ được chia thành 1 module
- Trong một module sẽ có đầy đủ các folders như: api, assets, components, constants, core, hooks, models, services, utils để thực hiện chức năng cho tính năng đó
```

## Code convention

### Function name

```
style: camel
```

### Variable name

```
style: camel | constant (Ex: userName)
variable containing many elements: [key work]List (Ex: driverList)
NOT drivers. There's not much difference when looking at drivers and driver
```

### Component name

```
style: pascal (Ex: HRModel)
```

### Model name

```
style: pascal and has postfix Model (Ex: HRModel)
```

### Interface name

```
style: pascal and has prefix I (Ex: IResource)
```

### Logical Operators

```
use `===` NOT `==`
use `!==` NOT `!=`
```

### Don't use default exports

```
use exporting declarations or export list.
except the component that you want to lazy load (Ex: EmployeePage)
```

### Always use useQuery to call api

```
it reduces the number of duplicate API calls.
https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/
```

### Always clean your code

### Commit convention

https://github.com/conventional-changelog/commitlint
