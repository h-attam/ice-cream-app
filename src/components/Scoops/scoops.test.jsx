import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Scoops from './index';

it("API'den alınan veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // Ekrana basılan kartları al
  const images = await screen.findAllByRole("img");

  // Ekrandaki resimlerin (kartların) sayısı 1'den fazla mı?
  expect(images.length).toBeGreaterThanOrEqual(1);
});

it("Çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi", async () => {
  // userEvent'in kurulumunu yap
  const user = UserEvent.setup();

  // Test edilecek bileşeni render et
  render(<Scoops />);

  // Bütün ekleme ve azaltma butonlarını çağır
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

  // Toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // Toplam fiyat 0 mı kontrol et
  expect(total.textContent).toBe("0");

  // Chocolate'ın ekle butonuna tıkla
  await user.click(addBtns[2]);

  // Toplam fiyat 20 mi kontrol et
  expect(total.textContent).toBe("20");

  // Vanilla'nın ekle butonuna iki kez tıkla
  await user.dblClick(addBtns[1]);

  // Toplam fiyat 60 mı kontrol et
  expect(total.textContent).toBe("60");

  // Vanilla'nın azalt butonuna tıkla
  await user.click(delBtns[1]);

  // Toplam fiyat 40 mı kontrol et
  expect(total.textContent).toBe("40");

  // Vanilla'nın azalt butonuna tıkla
  await user.click(delBtns[1]);

  // Toplam fiyat 20 mi kontrol et
  expect(total.textContent).toBe("20");

  // Chocolate'ın azalt butonuna tıkla
  await user.click(delBtns[2]);

  // Toplam fiyat 0 mı kontrol et
  expect(total.textContent).toBe("0");
});
