import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

// prop olarak gönderilcek örnek item
const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
  id: "bd76",
};

// Prop olarak veri alan bir bileşni test ediyorsak bileşenin aldığı propları test ortamındada göndermemiz gerekir
test("Miktar,başlık ve fotoğraf gelen propa göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={3}
      addToBasket={() => {}}
      removeFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId("amount");

  // span içereği 3 mi kontrol et
  expect(amount.textContent).toBe("3");

  // chocolate yazısı ekrana geldimi kontrol et
  // getBy elementi bulumazsa hata fırlatır bu yüzden sadece "x" yazı içeriğine sahip element ekranda mı kontrolü yapmak istiyorsak getByText ile elementi çağırmak yeterlidir daha sonrasında expext kullanmaya bile gerek kalmaz
  screen.getByText("Chocolate");

  // resim elementini çağır
  const image = screen.getByAltText("çeşit-resim");

  // resmin kaynağı doğru mu kontrol et
  expect(image).toHaveAttribute("src", "/images/chocolate.png");
});

// ekle azalt butonlarında çalışıcak fonksiyonların testleri
test("Butonlara tıklanınca fonksiyonlar doğru parametre ile çalışır", async () => {
  const user = userEvent.setup();

  // prop olarak gönderilen fonksiyonu test ediceksek jest aracılığı ile test (mock) ediliebilir fonksiyonlar oluştur
  const addMockFn = jest.fn();
  const removeMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={5}
      addToBasket={addMockFn}
      removeFromBasket={removeMockFn}
    />
  );

  // butonları al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const delBtn = screen.getByRole("button", { name: /azalt/i });

  // ekle butonuna tıkla
  await user.click(addBtn);

  // addToBasket methodu doğru parametreler ile çağrıldı mı
  expect(addMockFn).toHaveBeenCalledWith(item);

  // azalt butonuna tıkla
  await user.click(delBtn);

  // removeFromBasket methodu doğru parametrelerle çalışıyor mu
  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

// todo azalt butonunu aktiflik testleri
describe("azalt butonu akitflik testleri", () => {
  it("miktar 1 den fazla ise buton aktiftir", () => {
    render(<Card item={item} amount={3} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeEnabled();
  });

  it("miktar 0 ise buton inaktiftir", () => {
    render(<Card item={item} amount={0} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeDisabled();
  });
});