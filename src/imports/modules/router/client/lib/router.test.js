import { createRouter } from './router';
import nextTick from 'timeout-as-promise';
import PageSignUp from '/src/imports/modules/pages/client/components/PageSignUp/PageSignUp.vue';
import PageSignIn from '/src/imports/modules/pages/client/components/PageSignIn/PageSignIn.vue';
import PagePasswordReset from '/src/imports/modules/pages/client/components/PagePasswordReset/PagePasswordReset.vue';
import PagePageEnrollAccount from '/src/imports/modules/pages/client/components/PageEnrollAccount/PageEnrollAccount.vue';
import PageHome from '/src/imports/modules/pages/client/components/PageHome/PageHome.vue';
import PagePrivate from '/src/imports/modules/pages/client/components/PagePrivate/PagePrivate.vue';

describe('router', async () => {
  it('adds /sign-up route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/sign-up');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PageSignUp);
  });
  it('adds /enroll-account route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/enroll-account');
    expect(route).toBeTruthy();
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PagePageEnrollAccount);
  });
  it('adds /sign-in route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/sign-in');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PageSignIn);
  });
  it('adds /reset-password route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/reset-password');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PagePasswordReset);
  });
  it('adds /home route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/home');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PageHome);
  });
  it('adds / route as /home', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PageHome);
  });
  it('adds /private route', async () => {
    const router = createRouter();
    const route = router.options.routes.find((route) => route.path === '/private');
    expect(route).toBeTruthy();
    const resolveRoute = jest.fn();
    route.component(resolveRoute);
    await nextTick();
    expect(resolveRoute).toHaveBeenCalledWith(PagePrivate);
  });
});
