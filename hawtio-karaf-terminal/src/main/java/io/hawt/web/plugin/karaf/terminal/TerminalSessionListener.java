package io.hawt.web.plugin.karaf.terminal;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.io.IOException;

/**
 * @author Stan Lewis
 */
public class TerminalSessionListener implements HttpSessionListener {


  @Override
  public void sessionCreated(HttpSessionEvent httpSessionEvent) {

  }

  @Override
  public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
    HttpSession session = httpSessionEvent.getSession();
    TerminalServlet.SessionTerminal st = (TerminalServlet.SessionTerminal) session.getAttribute("terminal");
    if (st != null) {
      st.close();
    }
  }
}
