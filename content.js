/* Nội dung từ Tharo's website.pdf. Không thêm học vấn, chứng chỉ hoặc số liệu chưa có trong PDF. */
const PORTFOLIO = {
  vi: {
    skip:'Đến nội dung chính', menu:'Mở menu', navAbout:'Bản thân', navExperience:'Kinh nghiệm', navActivities:'Hoạt động', navContact:'Liên hệ',
    hello:'Xin chào, tôi là', heroIntro:'Sinh viên năm cuối ngành Quản trị Kinh doanh, có kinh nghiệm trong bán hàng, chăm sóc khách hàng và tự triển khai các công việc kinh doanh từ giai đoạn đầu.',
    explore:'Khám phá hành trình', heroNote:'Kinh doanh · Nội dung · Kết nối', scroll:'Cuộn để tìm hiểu',
    aboutTitle:'Giới thiệu\nbản thân.', aboutEyebrow:'Từ kinh doanh đến những điều sáng tạo',
    intro:'Sinh viên năm cuối ngành Quản trị Kinh doanh, có kinh nghiệm trong bán hàng, chăm sóc khách hàng và tự triển khai các công việc kinh doanh từ giai đoạn đầu. Em khá thoải mái khi giao tiếp với khách hàng, thích tìm hiểu nhu cầu và tìm cách hỗ trợ để khách hàng có trải nghiệm tốt hơn. Bên cạnh công việc kinh doanh, em cũng có hứng thú với nội dung và các công việc sáng tạo. Và hơn hết, em là người chịu khó, sẵn sàng học hỏi và có thể linh hoạt khi công việc yêu cầu nhiều đầu việc khác nhau.',
    aboutQuote:'Em là người chịu khó, sẵn sàng học hỏi và có thể linh hoạt khi công việc yêu cầu nhiều đầu việc khác nhau.',
    experienceTitle:'Kinh nghiệm\nlàm việc.', activitiesTitle:'Hoạt động\nngoại khóa.',
    all:'Tất cả', galleryHint:'Chọn ảnh để xem lớn hơn — những khoảnh khắc từ hồ sơ hoạt động.', volunteer:'Từ thiện',
    contactTitle:'Liên hệ\nPhương Thảo.', copyEmail:'Sao chép email', phone:'Điện thoại', address:'Địa chỉ', addressText:'Đường Đống Đa, Hải Châu, Đà Nẵng, Việt Nam', backTop:'Lên đầu trang', personalWebsite:'Website cá nhân',
    details:'Công việc & kết quả', working:'Công việc thực hiện', results:'Kết quả', photo:'Ảnh', close:'Đóng', previousPhoto:'Ảnh trước', nextPhoto:'Ảnh sau', pause:'Tạm dừng chuyển ảnh', resume:'Tiếp tục chuyển ảnh', copied:'Đã sao chép email!', copyFailed:'Chưa sao chép được. Chọn địa chỉ email để mở ứng dụng gửi thư.',
    jobs:[
      {name:'CỬA HÀNG ÁO DÀI NẮNG', date:'05/2024 - 11/2024', category:'Sales & Customer Service', role:'Nhân viên bán hàng & Chăm sóc khách hàng', image:'ao-dai',
       tasks:['Tư vấn và chăm sóc khách hàng tại showroom và các kênh online.','Hỗ trợ xử lý đơn hàng, theo dõi tiến độ và chăm sóc khách hàng.','Quản lý, sắp xếp và trưng bày sản phẩm tại cửa hàng.','Hỗ trợ các công việc vận hành, điều phối và các nhiệm vụ phát sinh theo phân công của quản lý'],
       results:['Trong suốt quá trình làm việc nhận được đánh giá 85% - 95% thái độ tích cực, phản hồi nhanh','Dịch vụ chăm sóc khách hàng tốt - xuất sắc']},
      {name:'HÀN LIVING', date:'08/2026 - Nay', category:'Sales & Marketing', role:'Điều phối viên Kinh doanh và Tiếp thị', image:'han-living',
       tasks:['Tham gia xây dựng HÀN Living từ giai đoạn đầu, phụ trách triển khai các hoạt động liên quan đến sales, marketing và chăm sóc khách hàng.','Xây dựng và quản lý Fanpage, tìm kiếm và cập nhật thông tin căn hộ, chuẩn bị nội dung và hình ảnh cho các bài đăng.','Tư vấn khách hàng, tìm hiểu nhu cầu, giới thiệu sản phẩm và theo dõi khách hàng trong quá trình thuê nhà.','Sắp xếp lịch xem nhà, phối hợp với chủ nhà và khách hàng để hỗ trợ quá trình giao dịch.','Theo dõi các căn hộ đang có sẵn và cập nhật thông tin để đảm bảo tư vấn chính xác cho khách hàng.'],
       results:[]}
    ],
    clubs:[
      {group:'iart',name:'I-ART', fullName:'CÂU LẠC BỘ NGHỆ THUẬT INTERNATIONAL ARTISTRY & RHYTHMIC TALENT',role:'Thành viên ban Vocal',date:'09/2023 - 09/2025',logo:'i-art-logo',
       tasks:['Tham gia vào các sự kiện được CLB đề cử (hát đơn ca, hát song ca)','Hỗ trợ, quản lý và support cho các thành viên tại mỗi sự kiện âm nhạc','Chuẩn bị và sắp xếp các thành viên và lịch trình sự kiện phù hợp'],
       results:['Trong suốt quá trình làm việc nhận được đánh giá 90% thái độ tích cực, support được các thành viên','Kết nối thành viên team tốt, khả năng sắp xếp công việc tốt','Leader đánh giá khá tự tin trong việc làm chủ sân khấu và bản thân trong quá trình hợp tác và làm việc']},
      {group:'sbe',name:'KHỞI SỰ DOANH NGHIỆP SBE',fullName:'CLB KHỞI SỰ DOANH NGHIỆP SBE',role:'Phó Chủ nhiệm ban Đối ngoại CLB',date:'',logo:'sbe-logo',logoExtension:'png',tasks:[],results:[]},
      {group:'hub',name:'HUB NETWORK',fullName:'MẠNG LƯỚI TOÀN CẦU TRUNG TÂM KHỞI NGHIỆP, ĐỔI MỚI VÀ CHUYỂN ĐỔI',role:'Thành viên ban Đối ngoại',date:'09/2025 - 12/2025',logo:'hub-logo',
       tasks:['Kiểm tra và lên danh sách những diễn giả, nhà tài trợ và khách mời cho 3 sự kiện','Phối hợp ban Vận hành để soạn thảo hợp đồng khi làm việc với nhà tài trợ','Chuẩn bị và sắp xếp, chăm sóc đối tác trong và sau quá trình hợp tác','Tìm kiếm nhà tài trợ tiềm năng, diễn giả phù hợp với sự kiện của tổ chức'],
       results:['Trong suốt quá trình làm việc nhận được đánh giá 85% thái độ tích cực, phản hồi kịp thời','Hoàn thành tốt task được giao nhưng chưa đánh giá cao trong việc tìm nhà tài trợ tiềm năng']}
    ]
  },
  en: {
    skip:'Skip to main content', menu:'Open menu', navAbout:'About me', navExperience:'Experience', navActivities:'Activities', navContact:'Contact',
    hello:'Hello, I’m', heroIntro:'Final-year Business Administration student with experience in sales, customer service, and handling business tasks from the early stages.',
    explore:'Explore my journey', heroNote:'Business · Content · Connections', scroll:'Scroll to discover',
    aboutTitle:'Introduce\nmyself.', aboutEyebrow:'A little business, a little creativity',
    intro:'Final-year Business Administration student with experience in sales, customer service, and handling business tasks from the early stages. Comfortable communicating with customers, understanding their needs, and finding suitable ways to support them. Also interested in content and creative work. A careful and responsible person who is willing to learn and adapt to different tasks.',
    aboutQuote:'A careful and responsible person who is willing to learn and adapt to different tasks.',
    experienceTitle:'The journey\nso far.', activitiesTitle:'Life beyond\nthe everyday.', all:'All moments', galleryHint:'Select a photo to take a closer look — moments from my portfolio.', volunteer:'VOLUNTEER',
    contactTitle:'Contact\nPhương Thảo.', copyEmail:'Copy email address', phone:'Phone', address:'Address', addressText:'Dong Da street, Hai Chau, Da Nang, Viet Nam', backTop:'Back to top', personalWebsite:'Personal website',
    details:'Responsibilities & results', working:'Working experience', results:'Results', photo:'Photo', close:'Close', previousPhoto:'Previous photo', nextPhoto:'Next photo', pause:'Pause slideshow', resume:'Resume slideshow', copied:'Email address copied!', copyFailed:'Could not copy. Select the email address to open your email app.',
    jobs:[
      {name:'AO DAI NANG STORE',date:'05/2024 - 11/2024',category:'Sales & Customer Service',role:'Sales & Customer Service',image:'ao-dai',
       tasks:['Providing consultation and customer service at the showroom and through online channels','Assisting with order processing, tracking progress, and customer service','Manage, organize and display products in the store','Help with daily shop work and do other tasks from the manager'],
       results:['Got 85% - 95% good feedback for positive attitude and fast replies during work','Good to excellent customer service']},
      {name:'HÀN Living',date:'08/2026 - Present',category:'Sales & Marketing',role:'Sales & Marketing Coordinator',image:'han-living',
       tasks:['Contributed to launching HÀN Living from the ground up, executing key initiatives across sales, marketing, and customer service.','Grew brand presence on social media by crafting property descriptions, editing visual assets, and updating real-time listings.','Delivered personalized client advisory, matching tenant requirements with suitable properties and guiding them through move-in.','Coordinated property tours and facilitated clear communication between property owners and clients during deal closings.','Tracked real estate inventory and vacancy status to provide prompt and precise information to inquiries.'],results:[]}
    ],
    clubs:[
      {group:'iart',name:'I-ART',fullName:'INTERNATIONAL ARTISTRY & RHYTHMIC TALENT CLUB',role:'A member of Vocal team',date:'09/2023 - 09/2025',logo:'i-art-logo',
       tasks:['Represented the club in various music events, delivering both solo and duet performances.','Assisted in managing and supporting performers and crew across all live music shows.','Arranged member responsibilities and streamlined event schedules to ensure smooth operations.'],
       results:['Achieved a 90% positive feedback rating for attitude, teamwork, and proactive member support.','Demonstrated strong interpersonal and organizational skills by fostering team bonding and optimizing task allocation.','Commended by team leaders for exceptional stage presence, self-confidence, and smooth collaboration.']},
      {group:'sbe',name:'SMALL BUSINESS ENTERPRISE SBE',fullName:'SMALL BUSINESS ENTERPRISE CLUB',role:'Vice President of Parnership',date:'',logo:'sbe-logo',logoExtension:'png',tasks:[],results:[]},
      {group:'hub',name:'HUB NETWORK',fullName:'GLOBAL NETWORK OF STARTUP, INNOVATION AND TRANSFORMATION HUBS',role:'A member of Partnership',date:'09/2025 - 12/2025',logo:'hub-logo',
       tasks:['Researched and curated prospect lists of keynote speakers, sponsors, and VIP guests across 3 major events.','Partnered with the Operations team to draft and review sponsorship agreements and contracts.','Managed partner relations and on-site hospitality before, during, and after event execution.','Identified and engaged prospective sponsors and relevant guest speakers aligned with organizational event goals.'],
       results:['Achieved an 85% positive rating for a constructive attitude and prompt responsiveness throughout the term.','Consistently completed assigned tasks on schedule while continuing to develop and refine prospective sponsor outreach strategies.']}
    ]
  }
};
const GALLERY = [
  ...Array.from({length:7},(_,i)=>({image:`iart-${i+1}`,group:'iart',label:'I-Art',portrait:[1,5].includes(i)})),
  ...Array.from({length:5},(_,i)=>({image:`sbe-${i+1}`,group:'sbe',label:'SBE'})),
  ...Array.from({length:6},(_,i)=>({image:`hub-${i+1}`,group:'hub',label:'HUB Network & Other Events',portrait:[1,4,5].includes(i)}))
];
