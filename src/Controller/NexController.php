<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ActivityType;

class NexController extends AbstractController {

    public function index(): Response {
        return $this->render('nex/index.html.twig');
    }

    public function show_data(): Response {
        $nombre_archivo = "../src/Files/db.txt";

        $actividades = false;
        $respuesta['ERROR'] = '1';
        if (file_exists($nombre_archivo)) {
            $actividades = unserialize(file_get_contents($nombre_archivo));
            $respuesta['ERROR'] = '0';
        }

        $respuesta['DATA'] = $actividades;
        $respuesta['SIZE'] = count($actividades);
        echo json_encode($respuesta);
        die();
    }

    public function add_activity(Request $request): Response {
        $nombre_archivo = "../src/Files/db.txt";
        $form = $this->createForm(ActivityType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $nueva_actividad = $form->getData()['name'];
            $actividades = false;
            if (file_exists($nombre_archivo)) {
                $actividades = unserialize(file_get_contents($nombre_archivo));
            }
            $actividades[] = $nueva_actividad;
            file_put_contents($nombre_archivo, serialize($actividades));
            return $this->redirectToRoute('index');
        }

        return $this->render('nex/add_activity.html.twig', [
                    'form' => $form->createView(),
        ]);
    }

    public function generate_all_activity() {
        $nombre_archivo = "../src/Files/db.txt";
        for ($i = 1; $i <= 8; $i++) {
            $actividades[] = "Tarea " . $i;
        }
        file_put_contents($nombre_archivo, serialize($actividades));


        return $this->redirectToRoute('index');
    }

    public function delete_activity($id) {
        $nombre_archivo = "../src/Files/db.txt";


        if (file_exists($nombre_archivo) && isset($id)) {
            $actividades = unserialize(file_get_contents($nombre_archivo));
            if (array_key_exists($id, $actividades)) {
                unset($actividades[$id]);
            }

            $actividades = array_values($actividades);
            file_put_contents($nombre_archivo, serialize($actividades));
        }
        return $this->redirectToRoute('index');
    }

    public function delete_all_activity() {
        $nombre_archivo = "../src/Files/db.txt";
        if (file_exists($nombre_archivo)) {
            unlink($nombre_archivo);
        }
        return $this->redirectToRoute('index');
    }

    public function modify_priority() {
        $actividad = $_POST['actividad'];
        $prioridad = $_POST['prioridad'];

        $nombre_archivo = "../src/Files/db.txt";

        $respuesta['ERROR'] = '1';
        $actividades = unserialize(file_get_contents($nombre_archivo));
        if (file_exists($nombre_archivo) && array_key_exists($actividad, $actividades)) {
            $actividades = unserialize(file_get_contents($nombre_archivo));
            $respuesta['ERROR'] = '0';

            if ($prioridad == "1") {
                //Subir Prioridad
                if ($actividad - 1 >= 0) {
                    $value1 = $actividades[$actividad];
                    $value2 = $actividades[$actividad - 1];

                    $actividades[$actividad] = $value2;
                    $actividades[$actividad - 1] = $value1;

                    file_put_contents($nombre_archivo, serialize($actividades));
                }
            } else {
                //Bajar Prioridad
                if ($actividad + 1 <= count($actividades)) {
                    $value1 = $actividades[$actividad];
                    $value2 = $actividades[$actividad + 1];

                    $actividades[$actividad] = $value2;
                    $actividades[$actividad + 1] = $value1;

                    file_put_contents($nombre_archivo, serialize($actividades));
                }
            }
        }

        echo json_encode($respuesta);
        die();
    }

}
